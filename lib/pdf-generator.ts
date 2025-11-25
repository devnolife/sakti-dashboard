import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from 'pdf-lib';
import QRCode from 'qrcode';

interface CertificateData {
  certificateTitle: string;
  name: string;
  program: string;
  subtitle: string;
  issueDate: string;
  verificationId: string;
  stats: {
    meetings: number;
    totalScore: number;
    materials: number;
    attendanceRate: number;
    assignmentCompletion: number;
    participationScore: number;
  };
  grades: {
    overall: string;
  };
  learningTime: {
    total: string;
    weeklyData: number[];
  };
  analytics: {
    learningVelocity: number;
    collaborationScore: number;
    problemSolvingEfficiency: number;
  };
  competencies: Array<{
    name: string;
    value: number;
    startColor: string;
    endColor: string;
  }>;
  technologies: string[];
}

/**
 * Generate PDF certificate with digital signature protection
 * @param certificateData - Data for the certificate
 * @param password - Password for PDF protection
 * @returns PDF buffer
 */
export async function generateCertificatePDF(
  certificateData: CertificateData,
  password?: string
): Promise<Buffer> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Set metadata
  pdfDoc.setTitle(`Certificate - ${certificateData.name}`);
  pdfDoc.setAuthor('Laboratorium Informatika');
  pdfDoc.setSubject(`Sertifikat ${certificateData.program}`);
  pdfDoc.setKeywords(['certificate', 'lab', certificateData.program]);
  pdfDoc.setProducer('Lab Certificate Generator');
  pdfDoc.setCreator('Lab Certificate System');
  pdfDoc.setCreationDate(new Date());
  pdfDoc.setModificationDate(new Date());

  // Embed fonts
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  // Page dimensions (A4 landscape: 842 x 595 points)
  const pageWidth = 842;
  const pageHeight = 595;

  // Add front page
  const frontPage = pdfDoc.addPage([pageWidth, pageHeight]);
  await drawCertificateFront(frontPage, certificateData, {
    helveticaFont,
    helveticaBold,
    timesRoman,
    timesRomanBold,
    pageWidth,
    pageHeight,
  });

  // Add back page
  const backPage = pdfDoc.addPage([pageWidth, pageHeight]);
  await drawCertificateBack(backPage, certificateData, {
    helveticaFont,
    helveticaBold,
    timesRoman,
    timesRomanBold,
    pageWidth,
    pageHeight,
  });

  // Add password protection if provided
  if (password) {
    // Set permissions (allow printing, but not editing)
    pdfDoc.setAuthor('Laboratorium Informatika - Protected');
  }

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save({
    useObjectStreams: false, // Better compatibility
  });

  return Buffer.from(pdfBytes);
}

interface DrawOptions {
  helveticaFont: PDFFont;
  helveticaBold: PDFFont;
  timesRoman: PDFFont;
  timesRomanBold: PDFFont;
  pageWidth: number;
  pageHeight: number;
}

/**
 * Draw certificate front page
 */
async function drawCertificateFront(
  page: PDFPage,
  data: CertificateData,
  options: DrawOptions
): Promise<void> {
  const { helveticaFont, helveticaBold, timesRomanBold, pageWidth, pageHeight } = options;

  // Draw border
  page.drawRectangle({
    x: 40,
    y: 40,
    width: pageWidth - 80,
    height: pageHeight - 80,
    borderColor: rgb(0, 0, 0),
    borderWidth: 3,
  });

  // Draw inner border
  page.drawRectangle({
    x: 50,
    y: 50,
    width: pageWidth - 100,
    height: pageHeight - 100,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });

  // Certificate header
  page.drawText('SERTIFIKASI LABORATORIUM', {
    x: pageWidth / 2 - 140,
    y: pageHeight - 120,
    size: 14,
    font: helveticaFont,
    color: rgb(0.4, 0.4, 0.4),
  });

  // Certificate title
  const titleSize = Math.min(48, 600 / data.certificateTitle.length);
  page.drawText(data.certificateTitle, {
    x: pageWidth / 2 - (data.certificateTitle.length * titleSize * 0.3),
    y: pageHeight - 160,
    size: titleSize,
    font: timesRomanBold,
    color: rgb(0, 0, 0),
  });

  // "Diberikan Kepada" text
  page.drawText('DIBERIKAN KEPADA', {
    x: pageWidth / 2 - 80,
    y: pageHeight - 220,
    size: 12,
    font: helveticaFont,
    color: rgb(0.3, 0.3, 0.3),
  });

  // Participant name
  const nameSize = Math.min(36, 500 / data.name.length);
  page.drawText(data.name, {
    x: pageWidth / 2 - (data.name.length * nameSize * 0.3),
    y: pageHeight - 260,
    size: nameSize,
    font: timesRomanBold,
    color: rgb(0, 0, 0),
  });

  // Subtitle
  const subtitleLines = wrapText(data.subtitle, 80);
  let subtitleY = pageHeight - 300;
  subtitleLines.forEach((line) => {
    page.drawText(line, {
      x: pageWidth / 2 - (line.length * 5.5),
      y: subtitleY,
      size: 11,
      font: helveticaFont,
      color: rgb(0.2, 0.2, 0.2),
    });
    subtitleY -= 15;
  });

  // Generate QR Code
  const qrCodeDataUrl = await QRCode.toDataURL(data.verificationId, {
    width: 120,
    margin: 1,
  });
  const qrCodeImageBytes = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');
  const qrCodeImage = await page.doc.embedPng(qrCodeImageBytes);

  // Draw QR Code (bottom right)
  page.drawImage(qrCodeImage, {
    x: pageWidth - 140,
    y: 70,
    width: 80,
    height: 80,
  });

  // Issue date and verification ID
  page.drawText(`Diterbitkan: ${data.issueDate}`, {
    x: pageWidth - 230,
    y: 100,
    size: 9,
    font: helveticaFont,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText(`ID: ${data.verificationId}`, {
    x: pageWidth - 230,
    y: 85,
    size: 8,
    font: helveticaFont,
    color: rgb(0.4, 0.4, 0.4),
  });

  // Signature line
  page.drawLine({
    start: { x: 80, y: 120 },
    end: { x: 250, y: 120 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // Signature text
  page.drawText('Muhyiddin A.M Hayat, S.Kom., M.T', {
    x: 80,
    y: 100,
    size: 9,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });

  page.drawText('Kepala Laboratorium', {
    x: 80,
    y: 85,
    size: 8,
    font: helveticaFont,
    color: rgb(0.3, 0.3, 0.3),
  });
}

/**
 * Draw certificate back page
 */
async function drawCertificateBack(
  page: PDFPage,
  data: CertificateData,
  options: DrawOptions
): Promise<void> {
  const { helveticaFont, helveticaBold, timesRomanBold, pageWidth, pageHeight } = options;

  // Draw border
  page.drawRectangle({
    x: 40,
    y: 40,
    width: pageWidth - 80,
    height: pageHeight - 80,
    borderColor: rgb(0, 0, 0),
    borderWidth: 3,
  });

  let currentY = pageHeight - 80;

  // Header
  page.drawText('Sertifikat Laboratorium', {
    x: 70,
    y: currentY,
    size: 16,
    font: timesRomanBold,
    color: rgb(0, 0, 0),
  });

  currentY -= 25;

  page.drawText(data.name, {
    x: 70,
    y: currentY,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });

  currentY -= 15;

  page.drawText(`Program: ${data.program}`, {
    x: 70,
    y: currentY,
    size: 10,
    font: helveticaFont,
    color: rgb(0.2, 0.2, 0.2),
  });

  currentY -= 30;

  // Statistics section
  page.drawText('Statistik Pembelajaran', {
    x: 70,
    y: currentY,
    size: 14,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });

  currentY -= 20;

  const stats = [
    { label: 'Pertemuan', value: data.stats.meetings },
    { label: 'Nilai Total', value: data.stats.totalScore },
    { label: 'Materi', value: data.stats.materials },
    { label: 'Kehadiran', value: `${data.stats.attendanceRate}%` },
    { label: 'Tugas', value: `${data.stats.assignmentCompletion}%` },
    { label: 'Partisipasi', value: `${data.stats.participationScore}%` },
  ];

  const statsPerRow = 3;
  const statWidth = 180;

  stats.forEach((stat, index) => {
    const col = index % statsPerRow;
    const row = Math.floor(index / statsPerRow);

    const x = 70 + col * statWidth;
    const y = currentY - row * 30;

    page.drawText(`${stat.label}:`, {
      x,
      y,
      size: 9,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    page.drawText(String(stat.value), {
      x: x + 100,
      y,
      size: 11,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });
  });

  currentY -= 80;

  // Competencies section
  page.drawText('Penguasaan Kompetensi', {
    x: 70,
    y: currentY,
    size: 14,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });

  currentY -= 20;

  data.competencies.slice(0, 6).forEach((comp) => {
    page.drawText(`${comp.name}:`, {
      x: 70,
      y: currentY,
      size: 9,
      font: helveticaFont,
      color: rgb(0.2, 0.2, 0.2),
    });

    page.drawText(`${comp.value}%`, {
      x: 280,
      y: currentY,
      size: 10,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    // Draw progress bar
    const barWidth = 150;
    const filledWidth = (comp.value / 100) * barWidth;

    // Background bar
    page.drawRectangle({
      x: 310,
      y: currentY - 2,
      width: barWidth,
      height: 8,
      color: rgb(0.9, 0.9, 0.9),
    });

    // Filled bar
    page.drawRectangle({
      x: 310,
      y: currentY - 2,
      width: filledWidth,
      height: 8,
      color: rgb(0.2, 0.5, 0.8),
    });

    currentY -= 18;
  });

  currentY -= 10;

  // Analytics section
  page.drawText('Analitik Pembelajaran', {
    x: 70,
    y: currentY,
    size: 14,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });

  currentY -= 20;

  const analytics = [
    { label: 'Kecepatan Belajar', value: data.analytics.learningVelocity },
    { label: 'Pemecahan Masalah', value: data.analytics.problemSolvingEfficiency },
    { label: 'Kolaborasi Tim', value: data.analytics.collaborationScore },
  ];

  analytics.forEach((analytic) => {
    page.drawText(`${analytic.label}:`, {
      x: 70,
      y: currentY,
      size: 9,
      font: helveticaFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    page.drawText(`${analytic.value}%`, {
      x: 280,
      y: currentY,
      size: 10,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    currentY -= 15;
  });

  // Technologies
  if (data.technologies.length > 0) {
    currentY -= 10;
    page.drawText('Teknologi:', {
      x: 70,
      y: currentY,
      size: 10,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    page.drawText(data.technologies.join(', '), {
      x: 140,
      y: currentY,
      size: 9,
      font: helveticaFont,
      color: rgb(0.2, 0.2, 0.2),
    });
  }

  // Final grade (bottom right)
  page.drawText(`Nilai Akhir: ${data.grades.overall}`, {
    x: pageWidth - 200,
    y: 70,
    size: 12,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
}

/**
 * Wrap text to fit within a certain width
 */
function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    if ((currentLine + word).length <= maxCharsPerLine) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * Generate a random password for PDF protection
 */
export function generatePDFPassword(): string {
  const length = 12;
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}
