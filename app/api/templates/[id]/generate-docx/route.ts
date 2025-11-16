import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth-middleware"
import PizZip from "pizzip"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await verifyAuth(request)
    if (!auth.authenticated || !auth.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check role permissions
    const allowedRoles = ["admin_umum", "prodi", "admin"]
    if (!allowedRoles.includes(auth.user.role)) {
      return NextResponse.json(
        { error: "Forbidden: Only admins can generate DOCX files" },
        { status: 403 }
      )
    }

    // Get template from database
    const template = await prisma.template_uploads.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        file_url: true,
        variable_mapping: true,
        prodi_id: true,
        is_global: true
      }
    })

    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      )
    }

    // Check permissions
    if (auth.user.role === "prodi") {
      const userProdi = await prisma.lecturers.findUnique({
        where: { user_id: auth.user.id },
        select: { prodi_id: true }
      })

      if (template.prodi_id !== userProdi?.prodi_id) {
        return NextResponse.json(
          { error: "Forbidden: You can only generate templates for your prodi" },
          { status: 403 }
        )
      }
    }

    // Check if template has variables defined
    if (!template.variable_mapping || Object.keys(template.variable_mapping).length === 0) {
      return NextResponse.json(
        { error: "No variables defined for this template" },
        { status: 400 }
      )
    }

    // Fetch DOCX file from MinIO
    const response = await fetch(template.file_url)
    if (!response.ok) {
      throw new Error("Failed to fetch template file from storage")
    }

    const arrayBuffer = await response.arrayBuffer()

    // Load the DOCX file with PizZip
    const zip = new PizZip(arrayBuffer)

    // Get the main document XML (word/document.xml)
    let documentXml = zip.file("word/document.xml")?.asText()

    if (!documentXml) {
      throw new Error("Could not read document.xml from DOCX file")
    }

    console.log("=== Starting DOCX Variable Replacement ===")
    console.log("Variables to replace:", template.variable_mapping)

    // Replace all variable text content with placeholders in the XML
    Object.values(template.variable_mapping).forEach((variable: any) => {
      console.log(`\n--- Processing variable: ${variable.key} ---`)
      console.log(`Text to find: "${variable.textContent}"`)

      const placeholder = `{{${variable.key}}}`
      const searchText = variable.textContent

      // Method 1: Direct simple replacement (for text in single <w:t> tag)
      const escapedSearch = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

      // Replace in <w:t> tags directly
      const simpleRegex = new RegExp(`(<w:t[^>]*>)([^<]*)(${escapedSearch})([^<]*)(<\\/w:t>)`, "g")
      documentXml = documentXml!.replace(simpleRegex, (match, openTag, before, text, after, closeTag) => {
        console.log(`✓ Simple match found: "${text}"`)
        return openTag + before + placeholder + after + closeTag
      })

      // Method 2: Handle text split with XML tags in between (more complex)
      // Split search text into characters and create flexible regex
      const chars = searchText.split("")
      const flexiblePattern = chars
        .map((char: string) => char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("(?:<[^>]+>)*") // Allow any XML tags between characters

      const flexRegex = new RegExp(
        `(<w:t[^>]*>[^<]*)(${flexiblePattern})([^<]*<\\/w:t>)`,
        "g"
      )

      documentXml = documentXml!.replace(flexRegex, (match, before, text, after) => {
        // Extract just the text content without XML tags
        const cleanText = text.replace(/<[^>]+>/g, "")
        if (cleanText === searchText) {
          console.log(`✓ Flexible match found (split text): "${cleanText}"`)
          return before + placeholder + after
        }
        return match
      })

      // Method 3: Brute force - find and replace in continuous text runs
      const wtRegex = /<w:t[^>]*>([^<]*)<\/w:t>/g
      const textParts: Array<{ match: RegExpExecArray; text: string }> = []
      let wtMatch

      // Reset regex lastIndex
      wtRegex.lastIndex = 0
      while ((wtMatch = wtRegex.exec(documentXml!)) !== null) {
        textParts.push({ match: wtMatch, text: wtMatch[1] })
      }

      // Look for the search text in combinations of consecutive text parts
      for (let i = 0; i < textParts.length; i++) {
        let combined = textParts[i].text
        const indices = [i]

        // Try combining with next parts
        for (let j = i + 1; j < Math.min(i + 10, textParts.length); j++) {
          combined += textParts[j].text
          indices.push(j)

          if (combined.includes(searchText)) {
            console.log(`✓ Found in combined parts [${indices.join(",")}]: "${combined}"`)

            // Replace in the first part and clear the rest
            const startIdx = combined.indexOf(searchText)
            const endIdx = startIdx + searchText.length

            // Simple approach: replace in first part if text starts there
            if (startIdx === 0 && endIdx <= textParts[i].text.length) {
              const firstPart = textParts[i].match
              const newXml: string = documentXml!.substring(0, firstPart.index) +
                firstPart[0].replace(textParts[i].text, placeholder) +
                documentXml!.substring(firstPart.index + firstPart[0].length)
              documentXml = newXml
              console.log(`✓ Replaced in part ${i}`)
              break
            }
          }

          if (combined.length > searchText.length + 50) break
        }
      }
    })

    console.log("\n=== Replacement Complete ===")

    // Update the document.xml in the zip
    zip.file("word/document.xml", documentXml)

    // Generate modified DOCX file
    const modifiedDocx = zip.generate({
      type: "nodebuffer",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    }) as Buffer

    // Return the DOCX file as a download
    return new NextResponse(modifiedDocx as any, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${template.name}_with_variables.docx"`
      }
    })
  } catch (error) {
    console.error("Error generating DOCX:", error)
    return NextResponse.json(
      { error: "Failed to generate DOCX file", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
