import type { ExamStatus } from "@/types/exam"

export interface ExamRequirement {
  id: string
  title: string
  description: string
  completed: boolean
}

export interface StudentExam {
  id: string
  title: string
  abstract?: string
  status: ExamStatus
  submissionDate?: string
  scheduledDate?: string
  requirements: ExamRequirement[]
  feedback?: string
  score?: number
}

export interface StudentExamData {
  proposalExam: StudentExam
  resultExam: StudentExam
  closingExam: StudentExam
}

export const mockStudentExamData: StudentExamData = {
  proposalExam: {
    id: "proposal-1",
    title: "Analysis of Machine Learning Algorithms for Predictive Maintenance",
    status: "pending",
    requirements: [
      {
        id: "prop-req-1",
        title: "Sertifikat Penyelesaian KKP",
        description: "Submit a comprehensive research proposal document (min. 10 pages)",
        completed: true,
      },
      {
        id: "prop-req-2",
        title: "Literature Review",
        description: "Include at least 15 relevant academic references",
        completed: true,
      },
      {
        id: "prop-req-3",
        title: "Methodology Section",
        description: "Detailed explanation of research methodology",
        completed: false,
      },
      {
        id: "prop-req-4",
        title: "Advisor Approval",
        description: "Get written approval from your academic advisor",
        completed: false,
      },
    ],
  },
  resultExam: {
    id: "result-1",
    title: "",
    status: "pending",
    requirements: [
      {
        id: "res-req-1",
        title: "Completed Research Paper",
        description: "Submit your complete research paper (min. 40 pages)",
        completed: false,
      },
      {
        id: "res-req-2",
        title: "Data Analysis Results",
        description: "Include comprehensive data analysis and results",
        completed: false,
      },
      {
        id: "res-req-3",
        title: "Presentation Slides",
        description: "Prepare presentation slides for the examination",
        completed: false,
      },
      {
        id: "res-req-4",
        title: "Advisor Final Review",
        description: "Get final review and approval from your advisor",
        completed: false,
      },
      {
        id: "res-req-5",
        title: "Passed Ujian Proposal",
        description: "Must have passed the Ujian Proposalination",
        completed: false,
      },
    ],
  },
  closingExam: {
    id: "closing-1",
    title: "",
    status: "pending",
    requirements: [
      {
        id: "close-req-1",
        title: "Final Thesis Document",
        description: "Submit the final version of your thesis with all revisions",
        completed: false,
      },
      {
        id: "close-req-2",
        title: "Publication Proof",
        description: "Provide proof of research publication or submission",
        completed: false,
      },
      {
        id: "close-req-3",
        title: "Plagiarism Check Report",
        description: "Submit plagiarism check report with acceptable similarity index",
        completed: false,
      },
      {
        id: "close-req-4",
        title: "Passed Ujian hasil",
        description: "Must have passed the Ujian hasilination",
        completed: false,
      },
    ],
  },
}

