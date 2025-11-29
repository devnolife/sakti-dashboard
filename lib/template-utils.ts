import mammoth from "mammoth"
import { TemplateVariable } from "@/types/template"

export async function convertDocxToHtml(arrayBuffer: ArrayBuffer): Promise<string> {
  const htmlResult = await mammoth.convertToHtml(
    { arrayBuffer },
    {
      styleMap: [
        "p[style-name='Title'] => h1.text-3xl.font-bold.text-center.mb-6.mt-4:fresh",
        "p[style-name='Subtitle'] => h2.text-xl.font-semibold.text-center.mb-4.text-gray-600:fresh",
        "p[style-name='Heading 1'] => h2.text-2xl.font-bold.mt-6.mb-3.border-b.border-gray-300.pb-2:fresh",
        "p[style-name='Heading 2'] => h3.text-xl.font-bold.mt-5.mb-2:fresh",
        "p[style-name='Heading 3'] => h4.text-lg.font-semibold.mt-4.mb-2:fresh",
        "p[style-name='Heading 4'] => h5.text-base.font-semibold.mt-3.mb-1:fresh",
        "p[style-name='Normal'] => p.mb-3.leading-relaxed.text-justify:fresh",
        "p[style-name='Body Text'] => p.mb-3.leading-relaxed:fresh",
        "p[style-name='List Paragraph'] => p.ml-6.mb-2:fresh",
        "r[style-name='Strong'] => strong.font-bold",
        "r[style-name='Emphasis'] => em.italic",
        "p[style-name='Quote'] => blockquote.border-l-4.border-primary.pl-4.italic.my-4.text-gray-700:fresh",
        "p[style-name='align-center'] => p.text-center:fresh",
        "p[style-name='align-right'] => p.text-right:fresh",
      ],
      includeDefaultStyleMap: true,
      convertImage: mammoth.images.imgElement((image) => {
        return image.read("base64").then((imageBuffer) => {
          return {
            src: `data:${image.contentType};base64,${imageBuffer}`,
          }
        })
      }),
    }
  )
  return htmlResult.value
}

export async function extractRawText(arrayBuffer: ArrayBuffer): Promise<string> {
  const textResult = await mammoth.extractRawText({ arrayBuffer })
  return textResult.value
}

export async function replaceDocxVariables(
  originalFile: File,
  variableMapping: Record<string, TemplateVariable>
): Promise<Blob> {
  // Dynamically import PizZip
  const PizZip = (await import('pizzip')).default

  // Read original DOCX file as binary
  const arrayBuffer = await originalFile.arrayBuffer()

  // Load the DOCX file with PizZip
  const zip = new PizZip(arrayBuffer)

  // Get the main document XML (word/document.xml)
  let documentXml = zip.file('word/document.xml')?.asText()

  if (!documentXml) {
    throw new Error('Could not find document.xml in DOCX file')
  }

  // Replace all variable text content with placeholders in the XML
  Object.values(variableMapping).forEach((variable) => {
    const placeholder = `{{${variable.key}}}`

    // Escape special regex characters in the text content
    const escapedText = variable.textContent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    // First, try simple replacement
    const simpleRegex = new RegExp(escapedText, 'g')
    documentXml = documentXml!.replace(simpleRegex, placeholder)

    // Handle text split across <w:t> tags
    // This regex finds text that might be split across XML tags
    const wtRegex = /<w:t[^>]*>([^<]*)<\/w:t>/g

    // Build a list of all text runs to check for split text
    const textRuns: Array<{ text: string; fullMatch: string; startIndex: number }> = []
    let wtMatch

    while ((wtMatch = wtRegex.exec(documentXml!)) !== null) {
      textRuns.push({
        text: wtMatch[1],
        fullMatch: wtMatch[0],
        startIndex: wtMatch.index
      })
    }

    // Check if the variable text is split across multiple runs
    for (let i = 0; i < textRuns.length; i++) {
      let combinedText = textRuns[i].text
      let matchedRuns = [i]

      // Try to match with following runs
      for (let j = i + 1; j < textRuns.length && combinedText.length < variable.textContent.length + 50; j++) {
        // Check if there are only formatting tags between runs
        const betweenText = documentXml!.substring(
          textRuns[matchedRuns[matchedRuns.length - 1]].startIndex + textRuns[matchedRuns[matchedRuns.length - 1]].fullMatch.length,
          textRuns[j].startIndex
        )

        // If there's significant content between runs, break
        if (betweenText.replace(/<[^>]+>/g, '').trim().length > 0) {
          break
        }

        combinedText += textRuns[j].text
        matchedRuns.push(j)

        // Check if combined text matches our variable
        if (combinedText.includes(variable.textContent)) {
          // Found it! Now replace across all these runs
          const firstRun = textRuns[matchedRuns[0]]
          const lastRun = textRuns[matchedRuns[matchedRuns.length - 1]]

          const startIndex = firstRun.startIndex
          const endIndex = lastRun.startIndex + lastRun.fullMatch.length

          const sectionToReplace = documentXml!.substring(startIndex, endIndex)
          const replacedSection = `<w:t>${placeholder}</w:t>`

          documentXml = documentXml!.substring(0, startIndex) + replacedSection + documentXml!.substring(endIndex)

          break
        }
      }
    }
  })

  // Update the document.xml in the zip
  zip.file('word/document.xml', documentXml)

  // Generate modified DOCX file
  const modifiedDocx = zip.generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    compression: 'DEFLATE'
  })

  return modifiedDocx
}

export function generateHTMLWithVariables(
  html: string,
  variableMapping: Record<string, TemplateVariable>
): string {
  if (!html || Object.keys(variableMapping).length === 0) {
    return html
  }

  let highlightedHtml = html

  Object.values(variableMapping).forEach((variable) => {
    const highlighted = `<span class="variable-highlight" title="${variable.label}">{{${variable.key}}}</span>`

    highlightedHtml = highlightedHtml.replace(
      new RegExp(variable.textContent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
      highlighted
    )
  })

  return highlightedHtml
}

export function generateFullHTMLDocument(
  templateName: string,
  html: string,
  variableMapping: Record<string, TemplateVariable>
): string {
  const highlightedContent = generateHTMLWithVariables(html, variableMapping)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${templateName}</title>
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 14px;
      line-height: 1.6;
      color: #1a1a1a;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      background: #ffffff;
    }
    h1 {
      font-size: 24px;
      line-height: 1.3;
      margin-top: 1rem;
      margin-bottom: 1.5rem;
    }
    h2 {
      font-size: 20px;
      line-height: 1.3;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }
    h3 {
      font-size: 18px;
      line-height: 1.3;
      margin-top: 1.25rem;
      margin-bottom: 0.5rem;
    }
    h4 {
      font-size: 16px;
      line-height: 1.3;
      margin-top: 1rem;
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0.75rem;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1rem 0;
    }
    table td, table th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    blockquote {
      margin: 1rem 0;
      padding-left: 1rem;
      border-left: 4px solid #e5e7eb;
      color: #4b5563;
    }
    img {
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
    }
    ul, ol {
      margin-left: 2rem;
      margin-bottom: 0.75rem;
    }
    strong {
      font-weight: 700;
    }
    em {
      font-style: italic;
    }
    .variable-highlight {
      background-color: #fef08a;
      padding: 2px 6px;
      border-radius: 3px;
      border: 2px solid #facc15;
      font-weight: 600;
    }
    .print-info {
      page-break-after: always;
      padding: 20px;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      margin-bottom: 40px;
    }
    .print-info h2 {
      margin-top: 0;
      color: #374151;
    }
    .variable-list {
      list-style: none;
      padding: 0;
    }
    .variable-item {
      padding: 8px 12px;
      margin: 4px 0;
      background: white;
      border-radius: 4px;
      border-left: 4px solid #facc15;
    }
    .variable-key {
      font-family: 'Courier New', monospace;
      font-weight: bold;
      color: #7c3aed;
    }
    @media print {
      .print-info {
        page-break-after: always;
      }
    }
  </style>
</head>
<body>
  <div class="print-info">
    <h2>📋 Template Variable Information</h2>
    <p><strong>Template Name:</strong> ${templateName}</p>
    <p><strong>Total Variables:</strong> ${Object.keys(variableMapping).length}</p>
    <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
    <h3>Defined Variables:</h3>
    <ul class="variable-list">
      ${Object.entries(variableMapping).map(([key, variable]) => `
        <li class="variable-item">
          <span class="variable-key">{{${variable.key}}}</span> - 
          <strong>${variable.label}</strong> 
          <em>(${variable.type})</em>
          <br>
          <small style="color: #6b7280;">Current: "${variable.textContent}"</small>
        </li>
      `).join('')}
    </ul>
  </div>

  <div class="template-content">
    ${highlightedContent}
  </div>
</body>
</html>`
}
