/**
 * Certificate Data Encryption/Decryption Utilities
 *
 * This module provides functions to encrypt and decrypt certificate data
 * for QR code generation and verification.
 */

export interface CertificateData {
  n: string; // name
  o: string; // organization
  c: string; // certificate ID
  t: number; // timestamp
}

/**
 * Encrypt certificate data for QR code
 *
 * OPTIMIZED VERSION: Menghasilkan string yang sangat pendek untuk QR Code yang mudah di-scan
 * Format: certificateId saja (sudah unique dan bisa digunakan untuk lookup di database)
 *
 * Alasan perubahan:
 * - QR Code dengan data panjang (>100 chars) menjadi terlalu padat dan sulit di-scan
 * - Certificate ID sudah unique dan cukup untuk verifikasi
 * - Backend bisa lookup detail lengkap dari database menggunakan certificate ID
 * - Hasil QR Code jauh lebih sederhana dan mudah dipindai
 *
 * @param name - Student/participant name (stored in DB, not in QR)
 * @param organizationName - Laboratory/organization name (stored in DB, not in QR)
 * @param certificateId - Certificate ID (e.g., 001/IF/20222/A.5-II/IX/1446/2024)
 * @returns Simple string - just the certificate ID (URL-safe)
 */
export function encryptCertificateData(
  name: string,
  organizationName: string,
  certificateId: string
): string {
  try {
    // SIMPLIFIED: Hanya gunakan certificate ID yang sudah unique
    // Backend akan lookup detail lengkap (name, org, dll) dari database
    // Ini menghasilkan QR Code yang JAUH lebih sederhana dan mudah di-scan

    // Bersihkan certificate ID untuk URL (ganti / dengan -)
    const cleanId = certificateId
      .replace(/\//g, "-") // Replace / dengan -
      .replace(/\s+/g, "") // Remove spaces
      .trim();

    // Tambahkan hash sederhana untuk validasi (opsional, bisa dihilangkan jika masih terlalu panjang)
    // Hash ini untuk mencegah manipulasi URL
    const simpleHash = generateSimpleHash(certificateId);

    // Format: {cleanId}.{hash}
    // Contoh: 001-IF-20222-A.5-II-IX-1446-2024.a3f2
    return `${cleanId}.${simpleHash}`;
  } catch (error) {
    console.error("Error encrypting certificate data:", error);
    // Fallback to certificate ID only if encryption fails
    return certificateId.replace(/\//g, "-");
  }
}

/**
 * Generate simple hash untuk validasi
 * Menghasilkan hash 4-6 karakter dari string input
 */
function generateSimpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Convert to base36 dan ambil 4 karakter
  return Math.abs(hash).toString(36).substring(0, 4);
}

/**
 * Decrypt certificate data from QR code
 *
 * SIMPLIFIED VERSION: Parse certificate ID dari QR code
 * Backend harus lookup detail lengkap dari database
 *
 * @param encryptedData - Simple string dari QR code (format: certificateId.hash)
 * @returns Certificate ID yang bisa digunakan untuk lookup database
 */
export function decryptCertificateData(
  encryptedData: string
): CertificateData | null {
  try {
    // Split by dot untuk extract ID dan hash
    const parts = encryptedData.split(".");

    if (parts.length < 1) {
      console.error("Invalid certificate data format");
      return null;
    }

    // Extract certificate ID (part sebelum dot)
    const certificateId = parts[0].replace(/-/g, "/"); // Convert back - to /

    // Validate hash if present (opsional)
    if (parts.length === 2) {
      const providedHash = parts[1];
      const expectedHash = generateSimpleHash(certificateId);

      if (providedHash !== expectedHash) {
        console.warn("Hash mismatch - possible URL manipulation");
        // Tetap lanjutkan, hash hanya untuk warning
      }
    }

    // Return minimal data - backend akan lookup detail lengkap dari database
    return {
      n: "", // Will be filled by backend from database
      o: "", // Will be filled by backend from database
      c: certificateId,
      t: Date.now(), // Current time as fallback
    };
  } catch (error) {
    console.error("Error decrypting certificate data:", error);
    return null;
  }
}

/**
 * Validate certificate data structure
 *
 * UPDATED: Validasi minimal - certificate ID wajib ada
 * Name dan organization akan di-lookup dari database
 *
 * @param data - Certificate data to validate
 * @returns true if valid, false otherwise
 */
export function validateCertificateData(
  data: CertificateData | null
): data is CertificateData {
  if (!data) return false;

  // Minimal validation - hanya certificate ID yang wajib dari QR code
  return typeof data.c === "string" && data.c.length > 0;
}

/**
 * Format certificate data for display
 *
 * @param data - Certificate data
 * @returns Formatted object with full field names
 */
export function formatCertificateData(data: CertificateData) {
  return {
    name: data.n,
    organization: data.o,
    certificateId: data.c,
    timestamp: data.t,
    issuedDate: new Date(data.t).toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}
