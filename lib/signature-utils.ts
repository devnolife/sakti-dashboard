import crypto from 'crypto';

/**
 * Digital Signature Utility for Document Verification
 * Uses HMAC-SHA256 for signing and verification
 */

const SECRET_KEY = process.env.SIGNATURE_SECRET_KEY || 'change-this-in-production-minimum-32-chars';
const ALGORITHM = 'sha256';

export interface DocumentSignature {
  documentId: string;
  documentNumber: string;
  issueDate: string;
  signerName: string;
  signerRole: string;
  timestamp: number;
}

export interface SignatureData {
  signature: string;
  data: DocumentSignature;
  qrCodeData: string;
}

/**
 * Generate a unique hash for a document
 */
export function generateDocumentHash(
  documentNumber: string,
  issueDate: string,
  additionalData?: string
): string {
  const data = ${documentNumber}|||;
  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex')
    .substring(0, 16);
}

/**
 * Sign document data using HMAC
 */
export function signDocument(data: DocumentSignature): string {
  const payload = JSON.stringify(data);
  return crypto
    .createHmac(ALGORITHM, SECRET_KEY)
    .update(payload)
    .digest('hex');
}

/**
 * Verify document signature
 */
export function verifySignature(
  data: DocumentSignature,
  signature: string
): boolean {
  const expectedSignature = signDocument(data);
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Generate complete signature data with QR code content
 */
export function generateSignatureData(
  documentId: string,
  documentNumber: string,
  issueDate: string,
  signerName: string,
  signerRole: string
): SignatureData {
  const data: DocumentSignature = {
    documentId,
    documentNumber,
    issueDate,
    signerName,
    signerRole,
    timestamp: Date.now(),
  };

  const signature = signDocument(data);

  // Create verification URL with encoded data
  const encodedData = Buffer.from(JSON.stringify(data)).toString('base64url');
  const verificationUrl = ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify//;

  return {
    signature,
    data,
    qrCodeData: verificationUrl,
  };
}

/**
 * Decode and verify QR code data
 */
export function verifyQRCodeData(
  encodedData: string,
  signature: string
): { valid: boolean; data?: DocumentSignature; error?: string } {
  try {
    // Decode base64url data
    const jsonData = Buffer.from(encodedData, 'base64url').toString('utf-8');
    const data: DocumentSignature = JSON.parse(jsonData);

    // Verify signature
    const isValid = verifySignature(data, signature);

    if (!isValid) {
      return {
        valid: false,
        error: 'Invalid signature - document may have been tampered with',
      };
    }

    return { valid: true, data };
  } catch (error) {
    return {
      valid: false,
      error: 'Failed to decode signature data',
    };
  }
}

/**
 * Generate a unique document number
 * Format: {prodi}/{jenis}/{nomor}/{bulan}/{tahun}
 * Example: IF/SK/001/XI/2025
 */
export function generateDocumentNumber(
  prodiCode: string,
  jenisSurat: string,
  counter: number,
  date: Date = new Date()
): string {
  const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const month = romanMonths[date.getMonth()];
  const year = date.getFullYear();
  const paddedCounter = counter.toString().padStart(3, '0');

  return ${paddedCounter}////;
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Hash sensitive data
 */
export function hashData(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}
