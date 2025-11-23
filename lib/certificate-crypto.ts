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
 * @param name - Student/participant name
 * @param organizationName - Laboratory/organization name
 * @param certificateId - Certificate ID (e.g., 001/IF/20222/A.5-II/IX/1446/2024)
 * @returns Encrypted string suitable for URL
 */
export function encryptCertificateData(
  name: string,
  organizationName: string,
  certificateId: string
): string {
  try {
    // Create JSON object with certificate data
    const certData: CertificateData = {
      n: name,
      o: organizationName || "Laboratorium Informatika",
      c: certificateId,
      t: Date.now(),
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(certData);

    // Encode to Base64
    const base64Encoded = btoa(
      encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );

    // Add custom obfuscation: reverse and add prefix/suffix
    const obfuscated = `CERT_${base64Encoded.split("").reverse().join("")}_LAB`;

    return encodeURIComponent(obfuscated);
  } catch (error) {
    console.error("Error encrypting certificate data:", error);
    // Fallback to certificate ID only if encryption fails
    return encodeURIComponent(certificateId || "UNKNOWN");
  }
}

/**
 * Decrypt certificate data from QR code
 *
 * @param encryptedData - Encrypted string from QR code
 * @returns Decrypted certificate data object or null if decryption fails
 */
export function decryptCertificateData(
  encryptedData: string
): CertificateData | null {
  try {
    // Decode URL encoding
    const decodedUrl = decodeURIComponent(encryptedData);

    // Remove prefix and suffix
    if (!decodedUrl.startsWith("CERT_") || !decodedUrl.endsWith("_LAB")) {
      console.error("Invalid encrypted data format");
      return null;
    }

    const withoutPrefixSuffix = decodedUrl.slice(5, -4); // Remove "CERT_" and "_LAB"

    // Reverse the string (undo obfuscation)
    const base64String = withoutPrefixSuffix.split("").reverse().join("");

    // Decode from Base64
    const jsonString = decodeURIComponent(
      atob(base64String)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    // Parse JSON
    const certData = JSON.parse(jsonString) as CertificateData;

    // Validate required fields
    if (!certData.n || !certData.o || !certData.c) {
      console.error("Missing required certificate data fields");
      return null;
    }

    return certData;
  } catch (error) {
    console.error("Error decrypting certificate data:", error);
    return null;
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
    typeof data.n === "string" &&
    data.n.length > 0 &&
    typeof data.o === "string" &&
    data.o.length > 0 &&
    typeof data.c === "string" &&
    data.c.length > 0 &&
    typeof data.t === "number" &&
    data.t > 0
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
