/**
 * Certificate Data Encryption/Decryption Utilities
 *
 * This module provides functions to encrypt and decrypt certificate data
 * for QR code generation and verification.
 *
 * CLIENT-SIDE VERSION: Uses simple base64url encoding for browser compatibility
 * SERVER-SIDE: Can use full encryption in API routes
 */

export interface CertificateData {
  certificateId: string;
}

/**
 * Check if we're running in browser or Node.js
 */
const isBrowser = typeof window !== "undefined";

/**
 * Encrypt certificate number/ID for QR code (CLIENT-SIDE)
 *
 * Browser-compatible version - uses base64url encoding
 * QR Code tetap secure karena harus match dengan database
 *
 * @param certificateId - Certificate ID (e.g., 001/IF/20222/A.5-II/IX/1446/2024)
 * @returns Encrypted string (base64url format - URL safe & compact)
 */
export function encryptCertificateData(certificateId: string): string {
  try {
    if (isBrowser) {
      // BROWSER VERSION: Simple base64url encoding
      // Secure enough karena:
      // 1. Certificate ID harus exist di database untuk valid
      // 2. Tidak expose sensitive data (hanya nomor sertifikat)
      // 3. Backend validation tetap dilakukan

      // Convert string to base64url (URL-safe)
      const base64 = btoa(
        encodeURIComponent(certificateId).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(parseInt(p1, 16))
        )
      );

      // Make URL-safe (base64url format)
      return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    } else {
      // SERVER VERSION: Try to use Node.js crypto if available
      return encryptCertificateDataServer(certificateId);
    }
  } catch (error) {
    console.error("Error encrypting certificate data:", error);
    // Ultimate fallback: just return the certificate ID
    return certificateId.replace(/\//g, "-");
  }
}

/**
 * Server-side encryption using Node.js crypto (for API routes)
 */
function encryptCertificateDataServer(certificateId: string): string {
  try {
    const encryptionKey = process.env.CERTIFICATE_ENCRYPTION_KEY;

    if (!encryptionKey) {
      console.warn(
        "CERTIFICATE_ENCRYPTION_KEY not found, using fallback encoding"
      );
      // Fallback to base64url
      return Buffer.from(certificateId).toString("base64url");
    }

    // Only available in Node.js environment
    const crypto = require("crypto");

    // Generate IV (Initialization Vector) - 12 bytes untuk GCM
    const iv = crypto.randomBytes(12);

    // Create cipher menggunakan AES-256-GCM
    const cipher = crypto.createCipheriv(
      "aes-256-gcm",
      Buffer.from(encryptionKey, "hex"),
      iv
    );

    // Encrypt certificate ID
    let encrypted = cipher.update(certificateId, "utf8", "hex");
    encrypted += cipher.final("hex");

    // Get auth tag (16 bytes untuk GCM)
    const authTag = cipher.getAuthTag();

    // Combine: IV + AuthTag + Encrypted Data
    const combined = Buffer.concat([
      iv,
      authTag,
      Buffer.from(encrypted, "hex"),
    ]);

    // Convert to base64url (URL-safe, no padding)
    return combined.toString("base64url");
  } catch (error) {
    console.error("Error in server-side encryption:", error);
    // Fallback to base64url
    return Buffer.from(certificateId).toString("base64url");
  }
}

/**
 * Decrypt certificate data from QR code
 *
 * Supports both browser-encoded and server-encrypted formats
 *
 * @param encryptedData - Encrypted string dari QR code (base64url format)
 * @returns Certificate ID yang telah didekripsi
 */
export function decryptCertificateData(
  encryptedData: string
): CertificateData | null {
  try {
    if (isBrowser) {
      // BROWSER VERSION: Decode base64url
      return decryptCertificateDataBrowser(encryptedData);
    } else {
      // SERVER VERSION: Try full decryption first, fallback to base64url
      return decryptCertificateDataServer(encryptedData);
    }
  } catch (error) {
    console.error("Error decrypting certificate data:", error);
    return null;
  }
}

/**
 * Browser-side decryption (base64url decode)
 */
function decryptCertificateDataBrowser(
  encryptedData: string
): CertificateData | null {
  try {
    // Add padding if needed
    let base64 = encryptedData.replace(/-/g, "+").replace(/_/g, "/");

    while (base64.length % 4) {
      base64 += "=";
    }

    // Decode base64
    const decoded = atob(base64);

    // Decode URI component
    const certificateId = decodeURIComponent(
      decoded
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return { certificateId };
  } catch (error) {
    console.error("Browser decode error:", error);
    // Try direct decode as fallback
    try {
      const directDecode = atob(
        encryptedData.replace(/-/g, "+").replace(/_/g, "/")
      );
      return { certificateId: directDecode };
    } catch {
      return null;
    }
  }
}

/**
 * Server-side decryption using Node.js crypto
 */
function decryptCertificateDataServer(
  encryptedData: string
): CertificateData | null {
  try {
    const encryptionKey = process.env.CERTIFICATE_ENCRYPTION_KEY;

    // First, try to detect if this is just base64url encoded (not encrypted)
    // Base64url encoded data will decode to a readable certificate ID format
    try {
      const possibleCertId = Buffer.from(encryptedData, "base64url").toString(
        "utf8"
      );

      // Check if it looks like a certificate ID (contains / or -)
      // Format: 001/IF/20222/A.5-II/IX/1446/2024
      if (possibleCertId.match(/^[\w\d\/-]+$/)) {
        // This is base64url encoded, not encrypted
        return { certificateId: possibleCertId };
      }
    } catch {
      // Continue to try encrypted format
    }

    if (!encryptionKey) {
      // No encryption key, must be base64url
      try {
        const certificateId = Buffer.from(encryptedData, "base64url").toString(
          "utf8"
        );
        return { certificateId };
      } catch {
        return null;
      }
    }

    // Try full decryption with Node.js crypto
    const crypto = require("crypto");

    // Decode dari base64url
    const combined = Buffer.from(encryptedData, "base64url");

    // Extract komponen: IV (12 bytes) + AuthTag (16 bytes) + Encrypted data
    if (combined.length < 28) {
      // Too short for encrypted format, try base64url decode
      const certificateId = Buffer.from(encryptedData, "base64url").toString(
        "utf8"
      );
      return { certificateId };
    }

    const iv = combined.subarray(0, 12);
    const authTag = combined.subarray(12, 28);
    const encrypted = combined.subarray(28);

    // Create decipher
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      Buffer.from(encryptionKey, "hex"),
      iv
    );

    // Set auth tag
    decipher.setAuthTag(authTag);

    // Decrypt
    let decrypted = decipher.update(encrypted, undefined, "utf8");
    decrypted += decipher.final("utf8");

    return { certificateId: decrypted };
  } catch (error) {
    // Silently fallback to base64url decode without logging error
    // This is expected for base64url encoded data
    try {
      const certificateId = Buffer.from(encryptedData, "base64url").toString(
        "utf8"
      );
      return { certificateId };
    } catch {
      console.error("Failed to decrypt/decode certificate data:", error);
      return null;
    }
  }
}

/**
 * Validate certificate data structure
 *
 * @param data - Certificate data to validate
 * @returns true if valid, false otherwise
 */
export function validateCertificateData(
  data: CertificateData | null
): data is CertificateData {
  if (!data) return false;
  return (
    typeof data.certificateId === "string" && data.certificateId.length > 0
  );
}

/**
 * Format certificate data for display
 *
 * @param data - Certificate data
 * @returns Formatted object with full field names
 */
export function formatCertificateData(data: CertificateData) {
  return {
    certificateId: data.certificateId,
  };
}
