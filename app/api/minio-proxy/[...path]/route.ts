import { NextRequest, NextResponse } from "next/server";
import { minioClient, bucketName } from "@/lib/minio-client";

/**
 * MinIO Proxy API
 * Proxies file requests from browser to MinIO server
 * Solves mixed content (HTTPS → HTTP) issues
 *
 * Usage: /api/minio-proxy/filename.pdf
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Get filename from path
    const fileName = params.path.join("/");

    if (!fileName) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    console.log(`📥 Proxying file: ${fileName}`);

    // Get file from MinIO
    const stream = await minioClient.getObject(bucketName, fileName);

    // Get file metadata for content type
    const stat = await minioClient.statObject(bucketName, fileName);

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);

    // Determine content type - prioritize PDF for .pdf files
    let contentType =
      stat.metaData["content-type"] || "application/octet-stream";

    // Force PDF content type for .pdf files
    if (fileName.toLowerCase().endsWith(".pdf")) {
      contentType = "application/pdf";
    }

    // Extract filename for Content-Disposition
    const fileNamePart = fileName.split("/").pop() || fileName;

    // Check if this is a download request (via query parameter)
    const url = new URL(request.url);
    const isDownload = url.searchParams.get("download") === "true";
    const customFileName = url.searchParams.get("filename");

    // Determine Content-Disposition based on request type
    const disposition = isDownload
      ? `attachment; filename="${encodeURIComponent(
          customFileName || fileNamePart
        )}"`
      : `inline; filename="${encodeURIComponent(fileNamePart)}"`;

    // Return file with proper headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": stat.size.toString(),
        "Content-Disposition": disposition,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Expose-Headers": "Content-Disposition, Content-Type",
      },
    });
  } catch (error: any) {
    console.error("❌ Error proxying file:", error);

    if (error.code === "NoSuchKey" || error.code === "NotFound") {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to get file", details: error.message },
      { status: 500 }
    );
  }
}

// Enable CORS for file access
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
