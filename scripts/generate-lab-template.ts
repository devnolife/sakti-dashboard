import * as XLSX from 'xlsx';

function buildTemplate() {
  const headers = [
    'certificateTitle','name','program','subtitle','meetings','totalScore','materials','attendanceRate','assignmentCompletion','participationScore','overallGrade','gradesBreakdown','competencies','weeklyData','technologies','instructorFeedback','futureRecommendations'
  ];

  const sampleFull = {
    certificateTitle: 'Backend Developer I',
    name: 'Asygar',
    program: 'Backend Developer Nest JS',
    subtitle: 'Atas keberhasilan menyelesaikan Laboratorium',
    meetings: 10,
    totalScore: 90,
    materials: 10,
    attendanceRate: 95,
    assignmentCompletion: 88,
    participationScore: 92,
    overallGrade: 'A',
    gradesBreakdown: JSON.stringify([
      { subject: 'Praktikum Backend', grade: 'A+', score: 95 },
      { subject: 'Database Design', grade: 'A', score: 90 },
      { subject: 'API Development', grade: 'A-', score: 87 },
      { subject: 'Server Management', grade: 'B+', score: 85 }
    ]),
    competencies: JSON.stringify([
      { name: 'Keterampilan Pemrograman (KP)', value: 35, startColor: '#3b82f6', endColor: '#1d4ed8', shadowColor: 'rgba(59,130,246,0.4)', bgColor: '#3b82f6', level: 'Expert' },
      { name: 'Kemampuan Analisis dan Evaluasi (KAE)', value: 30, startColor: '#06b6d4', endColor: '#0891b2', shadowColor: 'rgba(6,182,212,0.4)', bgColor: '#06b6d4', level: 'Advanced' },
      { name: 'Kreativitas dalam Pemecahan Masalah (KPM)', value: 25, startColor: '#10b981', endColor: '#059669', shadowColor: 'rgba(16,185,129,0.4)', bgColor: '#10b981', level: 'Advanced' },
      { name: 'Keterampilan Komunikasi (KK)', value: 20, startColor: '#6b7280', endColor: '#4b5563', shadowColor: 'rgba(107,114,128,0.4)', bgColor: '#6b7280', level: 'Intermediate' },
      { name: 'Etika dan Komunikasi Profesional', value: 15, startColor: '#ef4444', endColor: '#dc2626', shadowColor: 'rgba(239,68,68,0.4)', bgColor: '#ef4444', level: 'Intermediate' },
      { name: 'Kerja Tim', value: 10, startColor: '#f97316', endColor: '#ea580c', shadowColor: 'rgba(249,115,22,0.4)', bgColor: '#f97316', level: 'Beginner' }
    ]),
    weeklyData: JSON.stringify([45,52,38,61,47,55,43,38,52,45]),
    technologies: ['Typescript','NodeJS','Docker','PostgreSQL'].join(','),
    instructorFeedback: 'Menunjukkan pemahaman yang sangat baik dalam pengembangan backend dan kemampuan problem-solving yang excellent.',
    futureRecommendations: ['Advanced Microservices','Cloud Architecture','DevOps Practices'].join(',')
  };

  const samplePlaceholder = {
    certificateTitle: 'Nama Sertifikat',
    name: 'Nama Peserta',
    program: 'Nama Program',
    subtitle: 'Subjudul Sertifikat',
    meetings: 0,
    totalScore: 0,
    materials: 0,
    attendanceRate: 0,
    assignmentCompletion: 0,
    participationScore: 0,
    overallGrade: 'A',
    gradesBreakdown: JSON.stringify([
      { subject: 'Praktikum Backend', grade: 'A+', score: 95 },
      { subject: 'Database Design', grade: 'A', score: 90 }
    ]),
    competencies: JSON.stringify([
      { name: 'Keterampilan Pemrograman (KP)', value: 35, startColor: '#3b82f6', endColor: '#1d4ed8', shadowColor: 'rgba(59,130,246,0.4)', bgColor: '#3b82f6', level: 'Expert' },
      { name: 'Kemampuan Analisis dan Evaluasi (KAE)', value: 30, startColor: '#06b6d4', endColor: '#0891b2', shadowColor: 'rgba(6,182,212,0.4)', bgColor: '#06b6d4', level: 'Advanced' },
      { name: 'Kreativitas dalam Pemecahan Masalah (KPM)', value: 25, startColor: '#10b981', endColor: '#059669', shadowColor: 'rgba(16,185,129,0.4)', bgColor: '#10b981', level: 'Advanced' },
      { name: 'Keterampilan Komunikasi (KK)', value: 20, startColor: '#6b7280', endColor: '#4b5563', shadowColor: 'rgba(107,114,128,0.4)', bgColor: '#6b7280', level: 'Intermediate' },
      { name: 'Etika dan Komunikasi Profesional', value: 15, startColor: '#ef4444', endColor: '#dc2626', shadowColor: 'rgba(239,68,68,0.4)', bgColor: '#ef4444', level: 'Intermediate' },
      { name: 'Kerja Tim', value: 10, startColor: '#f97316', endColor: '#ea580c', shadowColor: 'rgba(249,115,22,0.4)', bgColor: '#f97316', level: 'Beginner' }
    ]),
    weeklyData: JSON.stringify([45,52,38,61,47,55,43,38,52,45]),
    technologies: ['Typescript','NodeJS','Docker','PostgreSQL'].join(','),
    instructorFeedback: 'Tulis umpan balik instruktur di sini.',
    futureRecommendations: ['Advanced Microservices','Cloud Architecture'].join(',')
  };

  const rows = [sampleFull, samplePlaceholder];
  const ws = XLSX.utils.json_to_sheet(rows, { header: headers });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  XLSX.writeFile(wb, 'template-sertifikat-lab.xlsx');
  console.log('Template generated: template-sertifikat-lab.xlsx');
}

buildTemplate();
