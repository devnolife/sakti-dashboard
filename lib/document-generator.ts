import { jsPDF } from 'jspdf';

export interface DocumentData {
  type: 'transfer_letter' | 'survey_letter' | 'kkp_letter' | 'recommendation_letter';
  student: {
    name: string;
    nim: string;
    program: string;
    semester: number;
    gpa?: number;
  };
  recipient?: {
    name: string;
    position: string;
    institution: string;
    address: string;
  };
  details: Record<string, any>;
  letterNumber?: string;
  date: Date;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  type: string;
  fields: DocumentField[];
  content: string;
}

export interface DocumentField {
  id: string;
  name: string;
  type: 'text' | 'textarea' | 'date' | 'select' | 'number';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export class DocumentGenerator {
  private static letterHead = {
    universityName: "UNIVERSITAS MUHAMMADIYAH MAKASSAR",
    facultyName: "FAKULTAS TEKNIK",
    address: "Jl. Sultan Alauddin No.259, Makassar 90221",
    phone: "(0411) 866972",
    email: "ft@unismuh.ac.id",
    website: "www.unismuh.ac.id"
  };

  static generateLetterNumber(type: string, year: number = new Date().getFullYear()): string {
    const sequence = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const monthRoman = this.getMonthInRoman(new Date().getMonth() + 1);
    
    switch (type) {
      case 'transfer_letter':
        return `${sequence}/SP/FT-UNISMUH/${monthRoman}/${year}`;
      case 'survey_letter':
        return `${sequence}/SPS/FT-UNISMUH/${monthRoman}/${year}`;
      case 'kkp_letter':
        return `${sequence}/KKP/FT-UNISMUH/${monthRoman}/${year}`;
      case 'recommendation_letter':
        return `${sequence}/SR/FT-UNISMUH/${monthRoman}/${year}`;
      default:
        return `${sequence}/SURAT/FT-UNISMUH/${monthRoman}/${year}`;
    }
  }

  private static getMonthInRoman(month: number): string {
    const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    return romans[month - 1] || 'I';
  }

  static async generateTransferLetter(data: DocumentData): Promise<Blob> {
    const doc = new jsPDF();
    
    // Header
    this.addLetterHeader(doc);
    
    // Letter content
    const letterNumber = data.letterNumber || this.generateLetterNumber('transfer_letter');
    
    doc.setFontSize(12);
    doc.text('SURAT KETERANGAN PINDAH', 105, 70, { align: 'center' });
    doc.text(`Nomor: ${letterNumber}`, 105, 80, { align: 'center' });
    
    let yPosition = 100;
    
    doc.setFontSize(11);
    doc.text('Yang bertanda tangan di bawah ini, Dekan Fakultas Teknik Universitas', 20, yPosition);
    yPosition += 7;
    doc.text('Muhammadiyah Makassar, dengan ini menerangkan bahwa:', 20, yPosition);
    yPosition += 15;
    
    // Student information
    doc.text(`Nama                    : ${data.student.name}`, 30, yPosition);
    yPosition += 7;
    doc.text(`NIM                     : ${data.student.nim}`, 30, yPosition);
    yPosition += 7;
    doc.text(`Program Studi           : ${data.student.program}`, 30, yPosition);
    yPosition += 7;
    doc.text(`Semester                : ${data.student.semester}`, 30, yPosition);
    yPosition += 15;
    
    // Transfer details
    doc.text('Adalah benar mahasiswa Fakultas Teknik Universitas Muhammadiyah Makassar', 20, yPosition);
    yPosition += 7;
    doc.text(`yang mengajukan pindah ke ${data.details.targetUniversity || '[UNIVERSITAS TUJUAN]'}`, 20, yPosition);
    yPosition += 7;
    doc.text(`pada Program Studi ${data.details.targetProgram || '[PROGRAM STUDI TUJUAN]'}.`, 20, yPosition);
    yPosition += 15;
    
    // Reason
    if (data.details.reason) {
      doc.text('Alasan pindah:', 20, yPosition);
      yPosition += 7;
      doc.text(`${data.details.reason}`, 20, yPosition);
      yPosition += 15;
    }
    
    doc.text('Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.', 20, yPosition);
    yPosition += 30;
    
    // Signature area
    const dateStr = data.date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    
    doc.text(`Makassar, ${dateStr}`, 130, yPosition);
    yPosition += 7;
    doc.text('Dekan Fakultas Teknik', 130, yPosition);
    yPosition += 30;
    doc.text('Prof. Dr. H. Ir. Abdul Rahman, M.T.', 130, yPosition);
    yPosition += 7;
    doc.text('NIP. 196512121991031002', 130, yPosition);
    
    return doc.output('blob');
  }

  static async generateSurveyLetter(data: DocumentData): Promise<Blob> {
    const doc = new jsPDF();
    
    // Header
    this.addLetterHeader(doc);
    
    // Letter content
    const letterNumber = data.letterNumber || this.generateLetterNumber('survey_letter');
    
    doc.setFontSize(12);
    doc.text('SURAT PENGANTAR SURVEY', 105, 70, { align: 'center' });
    doc.text(`Nomor: ${letterNumber}`, 105, 80, { align: 'center' });
    
    let yPosition = 100;
    
    if (data.recipient) {
      doc.setFontSize(11);
      doc.text('Kepada:', 20, yPosition);
      yPosition += 7;
      doc.text(`Yth. ${data.recipient.name}`, 20, yPosition);
      yPosition += 7;
      doc.text(`${data.recipient.position}`, 20, yPosition);
      yPosition += 7;
      doc.text(`${data.recipient.institution}`, 20, yPosition);
      yPosition += 7;
      doc.text(`${data.recipient.address}`, 20, yPosition);
      yPosition += 15;
    }
    
    doc.text('Dengan hormat,', 20, yPosition);
    yPosition += 10;
    
    doc.text('Sehubungan dengan pelaksanaan kegiatan penelitian dalam rangka penyelesaian', 20, yPosition);
    yPosition += 7;
    doc.text('Tugas Akhir/Skripsi, maka bersama ini kami mohon bantuan Bapak/Ibu untuk', 20, yPosition);
    yPosition += 7;
    doc.text('memberikan kesempatan kepada mahasiswa kami:', 20, yPosition);
    yPosition += 15;
    
    // Student information
    doc.text(`Nama                    : ${data.student.name}`, 30, yPosition);
    yPosition += 7;
    doc.text(`NIM                     : ${data.student.nim}`, 30, yPosition);
    yPosition += 7;
    doc.text(`Program Studi           : ${data.student.program}`, 30, yPosition);
    yPosition += 15;
    
    // Survey details
    if (data.details.researchTitle) {
      doc.text('Untuk melakukan penelitian dengan judul:', 20, yPosition);
      yPosition += 7;
      doc.text(`"${data.details.researchTitle}"`, 20, yPosition);
      yPosition += 15;
    }
    
    doc.text('Demikian surat pengantar ini kami buat, atas perhatian dan kerja sama', 20, yPosition);
    yPosition += 7;
    doc.text('Bapak/Ibu kami ucapkan terima kasih.', 20, yPosition);
    yPosition += 30;
    
    // Signature area
    const dateStr = data.date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    
    doc.text(`Makassar, ${dateStr}`, 130, yPosition);
    yPosition += 7;
    doc.text('Dekan Fakultas Teknik', 130, yPosition);
    yPosition += 30;
    doc.text('Prof. Dr. H. Ir. Abdul Rahman, M.T.', 130, yPosition);
    yPosition += 7;
    doc.text('NIP. 196512121991031002', 130, yPosition);
    
    return doc.output('blob');
  }

  static async generateKKPLetter(data: DocumentData): Promise<Blob> {
    const doc = new jsPDF();
    
    // Header
    this.addLetterHeader(doc);
    
    // Letter content
    const letterNumber = data.letterNumber || this.generateLetterNumber('kkp_letter');
    
    doc.setFontSize(12);
    doc.text('SURAT PENGANTAR KULIAH KERJA PRAKTIS (KKP)', 105, 70, { align: 'center' });
    doc.text(`Nomor: ${letterNumber}`, 105, 80, { align: 'center' });
    
    let yPosition = 100;
    
    if (data.recipient) {
      doc.setFontSize(11);
      doc.text('Kepada:', 20, yPosition);
      yPosition += 7;
      doc.text(`Yth. ${data.recipient.name}`, 20, yPosition);
      yPosition += 7;
      doc.text(`${data.recipient.position}`, 20, yPosition);
      yPosition += 7;
      doc.text(`${data.recipient.institution}`, 20, yPosition);
      yPosition += 7;
      doc.text(`${data.recipient.address}`, 20, yPosition);
      yPosition += 15;
    }
    
    doc.text('Dengan hormat,', 20, yPosition);
    yPosition += 10;
    
    doc.text('Sehubungan dengan program Kuliah Kerja Praktis (KKP) mahasiswa Fakultas', 20, yPosition);
    yPosition += 7;
    doc.text('Teknik Universitas Muhammadiyah Makassar, bersama ini kami mohon bantuan', 20, yPosition);
    yPosition += 7;
    doc.text('untuk dapat menerima mahasiswa kami:', 20, yPosition);
    yPosition += 15;
    
    // Student information
    if (data.details.teamMembers && Array.isArray(data.details.teamMembers)) {
      data.details.teamMembers.forEach((member: any, index: number) => {
        doc.text(`${index + 1}. ${member.name} (${member.nim})`, 30, yPosition);
        yPosition += 7;
      });
    } else {
      doc.text(`1. ${data.student.name} (${data.student.nim})`, 30, yPosition);
      yPosition += 7;
    }
    
    yPosition += 10;
    doc.text(`Program Studi: ${data.student.program}`, 30, yPosition);
    yPosition += 15;
    
    if (data.details.duration) {
      doc.text(`Untuk melaksanakan KKP selama ${data.details.duration} di instansi/perusahaan`, 20, yPosition);
      yPosition += 7;
      doc.text('yang Bapak/Ibu pimpin.', 20, yPosition);
      yPosition += 15;
    }
    
    doc.text('Demikian surat pengantar ini kami sampaikan, atas perhatian dan kerja sama', 20, yPosition);
    yPosition += 7;
    doc.text('yang baik kami ucapkan terima kasih.', 20, yPosition);
    yPosition += 30;
    
    // Signature area
    const dateStr = data.date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    
    doc.text(`Makassar, ${dateStr}`, 130, yPosition);
    yPosition += 7;
    doc.text('Dekan Fakultas Teknik', 130, yPosition);
    yPosition += 30;
    doc.text('Prof. Dr. H. Ir. Abdul Rahman, M.T.', 130, yPosition);
    yPosition += 7;
    doc.text('NIP. 196512121991031002', 130, yPosition);
    
    return doc.output('blob');
  }

  private static addLetterHeader(doc: jsPDF): void {
    // University logo placeholder (you would add actual logo here)
    doc.setFillColor(0, 50, 100);
    doc.rect(20, 15, 15, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('LOGO', 27.5, 25, { align: 'center' });
    
    // Header text
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(this.letterHead.universityName, 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(this.letterHead.facultyName, 105, 28, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text(this.letterHead.address, 105, 36, { align: 'center' });
    doc.text(`Telp: ${this.letterHead.phone} | Email: ${this.letterHead.email} | Website: ${this.letterHead.website}`, 105, 42, { align: 'center' });
    
    // Line separator
    doc.setLineWidth(0.5);
    doc.line(20, 50, 190, 50);
  }

  static async generateDocument(data: DocumentData): Promise<Blob> {
    switch (data.type) {
      case 'transfer_letter':
        return this.generateTransferLetter(data);
      case 'survey_letter':
        return this.generateSurveyLetter(data);
      case 'kkp_letter':
        return this.generateKKPLetter(data);
      default:
        throw new Error(`Unsupported document type: ${data.type}`);
    }
  }

  static downloadDocument(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static getDocumentTemplates(): DocumentTemplate[] {
    return [
      {
        id: 'transfer_letter',
        name: 'Surat Pindah',
        type: 'transfer_letter',
        fields: [
          { id: 'targetUniversity', name: 'Universitas Tujuan', type: 'text', required: true, placeholder: 'Nama universitas tujuan' },
          { id: 'targetProgram', name: 'Program Studi Tujuan', type: 'text', required: true, placeholder: 'Program studi tujuan' },
          { id: 'reason', name: 'Alasan Pindah', type: 'textarea', required: true, placeholder: 'Jelaskan alasan pindah...' }
        ],
        content: 'Template surat pindah program studi'
      },
      {
        id: 'survey_letter',
        name: 'Surat Pengantar Survey',
        type: 'survey_letter',
        fields: [
          { id: 'researchTitle', name: 'Judul Penelitian', type: 'text', required: true, placeholder: 'Judul penelitian/skripsi' },
          { id: 'recipientName', name: 'Nama Penerima', type: 'text', required: true, placeholder: 'Nama penerima surat' },
          { id: 'recipientPosition', name: 'Jabatan', type: 'text', required: true, placeholder: 'Jabatan penerima' },
          { id: 'institution', name: 'Instansi', type: 'text', required: true, placeholder: 'Nama instansi/perusahaan' },
          { id: 'address', name: 'Alamat', type: 'textarea', required: true, placeholder: 'Alamat lengkap instansi' }
        ],
        content: 'Template surat pengantar survey penelitian'
      },
      {
        id: 'kkp_letter',
        name: 'Surat Pengantar KKP',
        type: 'kkp_letter', 
        fields: [
          { id: 'duration', name: 'Durasi KKP', type: 'select', required: true, options: ['2 bulan', '3 bulan', '4 bulan'] },
          { id: 'teamMembers', name: 'Anggota Tim', type: 'textarea', required: false, placeholder: 'Daftar anggota tim (opsional)' },
          { id: 'recipientName', name: 'Nama Penerima', type: 'text', required: true, placeholder: 'Nama penerima surat' },
          { id: 'recipientPosition', name: 'Jabatan', type: 'text', required: true, placeholder: 'Jabatan penerima' },
          { id: 'institution', name: 'Instansi', type: 'text', required: true, placeholder: 'Nama instansi/perusahaan' },
          { id: 'address', name: 'Alamat', type: 'textarea', required: true, placeholder: 'Alamat lengkap instansi' }
        ],
        content: 'Template surat pengantar KKP'
      }
    ];
  }
}