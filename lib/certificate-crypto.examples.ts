/**
 * Example Usage of Certificate Crypto Functions
 *
 * This file demonstrates how to use the certificate encryption/decryption
 * functions in various scenarios.
 */

import {
  encryptCertificateData,
  decryptCertificateData,
  validateCertificateData,
  formatCertificateData,
} from "./certificate-crypto";

// ============================================
// EXAMPLE 1: Encrypting Certificate Data (for QR Code generation)
// ============================================
export function exampleEncryption() {
  const name = "Ahmad Rizki Pratama";
  const organization = "Laboratorium Informatika";
  const certificateId = "001/IF/20222/A.5-II/IX/1446/2024";

  const encrypted = encryptCertificateData(name, organization, certificateId);

  console.log("Encrypted Data:", encrypted);
  // Output: CERT_%3D%3D...._LAB (encrypted string)

  // This encrypted string will be used in QR code:
  const qrCodeURL = `https://sintekmu.ac.id/verify/${encrypted}`;
  console.log("QR Code URL:", qrCodeURL);
}

// ============================================
// EXAMPLE 2: Decrypting Certificate Data (in verification page)
// ============================================
export function exampleDecryption(encryptedFromQR: string) {
  // This would come from scanning QR code or URL parameter
  const decrypted = decryptCertificateData(encryptedFromQR);

  if (!decrypted) {
    console.error("Failed to decrypt certificate data");
    return null;
  }

  console.log("Decrypted Data:", {
    name: decrypted.n,
    organization: decrypted.o,
    certificateId: decrypted.c,
    timestamp: new Date(decrypted.t),
  });

  return decrypted;
}

// ============================================
// EXAMPLE 3: Complete Verification Flow
// ============================================
export async function verifyAndDisplayCertificate(encryptedData: string) {
  // Step 1: Decrypt the data
  const certData = decryptCertificateData(encryptedData);

  // Step 2: Validate the data
  if (!validateCertificateData(certData)) {
    return {
      success: false,
      error: "Invalid certificate data",
    };
  }

  // Step 3: Format for display
  const formatted = formatCertificateData(certData);

  // Step 4: Optionally, verify against database
  // const dbRecord = await checkDatabaseForCertificate(formatted.certificateId);

  return {
    success: true,
    data: formatted,
    message: "Certificate verified successfully",
  };
}

// ============================================
// EXAMPLE 4: React Component Usage (Verification Page)
// ============================================
export const ExampleVerificationComponent = `
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  decryptCertificateData, 
  validateCertificateData,
  formatCertificateData 
} from "@/lib/certificate-crypto";

export default function VerifyCertificatePage() {
  const params = useParams();
  const [certData, setCertData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const encryptedData = params.data as string;
    
    if (!encryptedData) {
      setError("No certificate data provided");
      return;
    }

    // Decrypt the data
    const decrypted = decryptCertificateData(encryptedData);
    
    // Validate
    if (!validateCertificateData(decrypted)) {
      setError("Invalid certificate data");
      return;
    }

    // Format and set
    const formatted = formatCertificateData(decrypted);
    setCertData(formatted);
  }, [params]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!certData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="certificate-verification">
      <h1>Certificate Verification</h1>
      <div className="cert-info">
        <p><strong>Name:</strong> {certData.name}</p>
        <p><strong>Organization:</strong> {certData.organization}</p>
        <p><strong>Certificate ID:</strong> {certData.certificateId}</p>
        <p><strong>Issued:</strong> {certData.issuedDate}</p>
      </div>
    </div>
  );
}
`;

// ============================================
// EXAMPLE 5: Testing Encryption/Decryption Roundtrip
// ============================================
export function testEncryptionRoundtrip() {
  const originalData = {
    name: "Siti Nurhaliza",
    organization: "Laboratorium Informatika",
    certificateId: "002/IF/20222/A.5-II/IX/1446/2024",
  };

  console.log("Original Data:", originalData);

  // Encrypt
  const encrypted = encryptCertificateData(
    originalData.name,
    originalData.organization,
    originalData.certificateId
  );
  console.log("Encrypted:", encrypted);

  // Decrypt
  const decrypted = decryptCertificateData(encrypted);
  console.log("Decrypted:", decrypted);

  // Verify data integrity
  if (decrypted) {
    const isValid =
      decrypted.n === originalData.name &&
      decrypted.o === originalData.organization &&
      decrypted.c === originalData.certificateId;

    console.log("Data Integrity Check:", isValid ? "PASSED ✓" : "FAILED ✗");
  }
}
