/**
 * Certificate File Upload Utilities
 * Handles uploading generated certificate PDFs to MinIO
 *
 * All certificate PDFs are stored in a single folder: 'sertifikat/'
 * Example URLs:
 * - /api/minio-proxy/sertifikat/001-IF-20222-A.5-II-IX-1446-2024_Ahmad_Rizki.pdf
 * - /api/minio-proxy/sertifikat/002-IF-20222-A.5-II-IX-1446-2024_Siti_Nur.pdf
 */

import { minioClient, bucketName } from "./minio-client";

/**
 * Check if a file exists in MinIO
 * @param fileName - Full path to file (e.g., 'sertifikat/xxx.pdf')
 * @returns true if file exists, false otherwise
 */
async function checkFileExists(fileName: string): Promise<boolean> {
  try {
    await minioClient.statObject(bucketName, fileName);
    return true;
  } catch (error: any) {
    // File doesn't exist
    if (error.code === "NotFound") {
      return false;
    }
    // Other errors
    throw error;
  }
}

/**
 * Delete a file from MinIO
 * @param fileName - Full path to file (e.g., 'sertifikat/xxx.pdf')
 */
async function deleteFileIfExists(fileName: string): Promise<void> {
  try {
    const exists = await checkFileExists(fileName);
    if (exists) {
      await minioClient.removeObject(bucketName, fileName);
      console.log(`🗑️ Old certificate deleted: ${fileName}`);
    }
  } catch (error) {
    console.error(`⚠️ Error deleting old file ${fileName}:`, error);
    // Don't throw error, continue with upload
  }
}

/**
 * Upload certificate PDF directly to MinIO without timestamp prefix
 * This ensures all certificates are stored in 'sertifikat/' folder
 *
 * If file already exists (e.g., re-upload for typo fix), it will be replaced
 *
 * @param file - File buffer
 * @param fileName - Full path including folder (e.g., 'sertifikat/xxx.pdf')
 * @param contentType - MIME type of the file
 * @returns MinIO file URL
 */
async function uploadCertificateFile(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  try {
    // Check if file already exists
    const exists = await checkFileExists(fileName);

    if (exists) {
      console.log(`📝 File already exists, will be replaced: ${fileName}`);
      // Delete old file directly (don't call deleteFileIfExists to avoid duplicate check)
      try {
        await minioClient.removeObject(bucketName, fileName);
        console.log(`🗑️ Old certificate deleted: ${fileName}`);
      } catch (deleteError) {
        console.error(`⚠️ Error deleting old file ${fileName}:`, deleteError);
        // Continue with upload even if delete fails
      }
    }

    // Upload file to MinIO WITHOUT timestamp prefix
    await minioClient.putObject(bucketName, fileName, file, file.length, {
      "Content-Type": contentType,
    });

    // Generate URL through Next.js proxy
    const url = `/api/minio-proxy/${fileName}`;

    if (exists) {
      console.log(`🔄 Certificate replaced: ${fileName}`);
    } else {
      console.log(`✅ Certificate uploaded: ${fileName}`);
    }
    return url;
  } catch (error) {
    console.error("❌ Error uploading certificate:", error);
    throw error;
  }
}

/**
 * Upload certificate PDF to MinIO
 * All certificates will be stored in 'sertifikat/' folder
 *
 * **Handling Re-uploads (Typo Fixes):**
 * - If file with same verification_id + name exists → Deletes old file first
 * - Then uploads new file with corrected data
 * - Same URL is maintained (no broken links)
 *
 * **Example Scenario:**
 * 1. Upload: "Ahmad Riki" (typo) → sertifikat/001-IF-..._Ahmad_Riki.pdf
 * 2. Re-upload: "Ahmad Rizki" (fixed) → sertifikat/001-IF-..._Ahmad_Rizki.pdf
 * 3. Old file deleted, new file uploaded ✅
 *
 * @param pdfBlob - PDF file as Blob
 * @param verificationId - Certificate verification ID (used for filename)
 * @param participantName - Participant name (used for filename)
 * @returns MinIO file URL (e.g., /api/minio-proxy/sertifikat/xxx.pdf)
 */
export async function uploadCertificatePDF(
  pdfBlob: Blob,
  verificationId: string,
  participantName: string
): Promise<string> {
  try {
    // Convert Blob to Buffer
    const arrayBuffer = await pdfBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create safe filename
    const safeName = participantName
      .replace(/[^a-zA-Z0-9\s]/g, "") // Remove special characters
      .replace(/\s+/g, "_") // Replace spaces with underscore
      .substring(0, 50); // Limit length

    const safeCertId = verificationId
      .replace(/\//g, "-") // Replace / with -
      .replace(/[^a-zA-Z0-9\-]/g, ""); // Remove other special chars

    // Simple path: sertifikat/{filename}.pdf
    const fileName = `sertifikat/${safeCertId}_${safeName}.pdf`;

    // Upload to MinIO
    const fileUrl = await uploadCertificateFile(
      buffer,
      fileName,
      "application/pdf"
    );

    console.log(`✅ Certificate PDF uploaded successfully`);
    return fileUrl;
  } catch (error) {
    console.error("❌ Error uploading certificate PDF:", error);
    throw error;
  }
}

/**
 * Upload certificate PDF from base64 string
 * All certificates will be stored in 'sertifikat/' folder
 *
 * **Handling Re-uploads (Typo Fixes):**
 * - If file with same verification_id + name exists → Deletes old file first
 * - Then uploads new file with corrected data
 * - Same URL is maintained (no broken links)
 *
 * **Use Case:**
 * When user re-generates certificates from same Excel file after fixing typos,
 * this function ensures old incorrect PDFs are replaced with new correct ones.
 *
 * @param base64Data - PDF file as base64 string
 * @param verificationId - Certificate verification ID
 * @param participantName - Participant name
 * @returns MinIO file URL (e.g., /api/minio-proxy/sertifikat/xxx.pdf)
 */
export async function uploadCertificatePDFFromBase64(
  base64Data: string,
  verificationId: string,
  participantName: string
): Promise<string> {
  try {
    // Remove data URI prefix if present (optimized for large strings)
    let base64String = base64Data;

    // Use simple indexOf instead of regex to avoid stack overflow on large strings
    const base64Prefix = "data:application/pdf;base64,";
    if (base64Data.startsWith(base64Prefix)) {
      base64String = base64Data.substring(base64Prefix.length);
    } else if (base64Data.startsWith("data:")) {
      // Handle other data URI formats
      const commaIndex = base64Data.indexOf(",");
      if (commaIndex !== -1) {
        base64String = base64Data.substring(commaIndex + 1);
      }
    }

    // Validate base64 string (basic check)
    if (!base64String || base64String.length === 0) {
      throw new Error("Empty base64 string");
    }

    // Convert base64 to Buffer (optimized for large strings)
    let buffer: Buffer;
    try {
      buffer = Buffer.from(base64String, "base64");
    } catch (bufferError) {
      console.error("Buffer conversion error:", bufferError);
      throw new Error("Failed to convert base64 to buffer");
    }

    // Validate buffer size (max 25MB for batch certificate generation)
    // Note: Individual certificate PDFs are typically 8-12MB due to high-quality graphics
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (buffer.length > maxSize) {
      throw new Error(
        `PDF file too large: ${(buffer.length / 1024 / 1024).toFixed(
          2
        )}MB (max 25MB)`
      );
    }

    // Log buffer size for debugging
    const sizeInMB = buffer.length / 1024 / 1024;
    if (sizeInMB > 1) {
      console.log(`📦 PDF buffer size: ${sizeInMB.toFixed(2)}MB`);
    } else {
      console.log(`📦 PDF buffer size: ${(buffer.length / 1024).toFixed(2)}KB`);
    }

    // Create safe filename (optimized character replacement)
    const safeName = participantName
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 50);

    const safeCertId = verificationId
      .replace(/\//g, "-")
      .replace(/[^a-zA-Z0-9\-]/g, "");

    // Simple path: sertifikat/{filename}.pdf
    const fileName = `sertifikat/${safeCertId}_${safeName}.pdf`;

    // Upload to MinIO
    const fileUrl = await uploadCertificateFile(
      buffer,
      fileName,
      "application/pdf"
    );

    console.log(`✅ Certificate PDF uploaded from base64`);
    return fileUrl;
  } catch (error) {
    console.error("❌ Error uploading certificate PDF from base64:", error);
    throw error;
  }
}

/**
 * Delete certificate PDF from MinIO by verification ID
 * Useful for cleanup or when certificate is revoked
 *
 * @param verificationId - Certificate verification ID
 * @param participantName - Participant name (must match the one used during upload)
 * @returns true if deleted, false if not found
 */
export async function deleteCertificatePDF(
  verificationId: string,
  participantName: string
): Promise<boolean> {
  try {
    // Create safe filename (same logic as upload)
    const safeName = participantName
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 50);

    const safeCertId = verificationId
      .replace(/\//g, "-")
      .replace(/[^a-zA-Z0-9\-]/g, "");

    const fileName = `sertifikat/${safeCertId}_${safeName}.pdf`;

    // Check if file exists
    const exists = await checkFileExists(fileName);

    if (!exists) {
      console.log(`ℹ️ Certificate not found in MinIO: ${fileName}`);
      return false;
    }

    // Delete file
    await minioClient.removeObject(bucketName, fileName);
    console.log(`🗑️ Certificate deleted: ${fileName}`);
    return true;
  } catch (error) {
    console.error("❌ Error deleting certificate PDF:", error);
    throw error;
  }
}

/**
 * Check if certificate PDF exists in MinIO
 *
 * @param verificationId - Certificate verification ID
 * @param participantName - Participant name
 * @returns true if exists, false otherwise
 */
export async function certificatePDFExists(
  verificationId: string,
  participantName: string
): Promise<boolean> {
  try {
    // Create safe filename (same logic as upload)
    const safeName = participantName
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 50);

    const safeCertId = verificationId
      .replace(/\//g, "-")
      .replace(/[^a-zA-Z0-9\-]/g, "");

    const fileName = `sertifikat/${safeCertId}_${safeName}.pdf`;

    return await checkFileExists(fileName);
  } catch (error) {
    console.error("❌ Error checking certificate PDF existence:", error);
    return false;
  }
}
