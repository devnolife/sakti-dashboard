"use server"

import { revalidatePath } from "next/cache"
import type { KkpLocationRequest, KkpLocationStatus } from "@/types/kkp-location"

// Mock data for KKP location requests
const MOCK_KKP_LOCATION_REQUESTS: KkpLocationRequest[] = [
  {
    id: "loc-001",
    companyName: "PT Teknologi Maju",
    companyAddress: "Jl. Teknologi No. 123",
    companyCity: "Jakarta Selatan",
    companyProvince: "DKI Jakarta",
    companyPostalCode: "12345",
    companyWebsite: "www.teknologimaju.com",
    companyIndustry: "Information Technology",
    companyDescription: "A leading technology company specializing in software development and IT consulting.",
    contactPerson: "Budi Santoso",
    contactPosition: "HR Manager",
    contactEmail: "budi.santoso@teknologimaju.com",
    contactPhone: "081234567890",
    proposedBy: {
      id: "std-001",
      name: "Ahmad Fauzi",
      nim: "1234567890",
      major: "Informatika",
      email: "ahmad.fauzi@example.com",
    },
    submissionDate: new Date("2023-09-01"),
    status: "pending",
    documents: [
      {
        id: "doc-001",
        name: "Company Profile",
        url: "/documents/company-profile-001.pdf",
        uploadDate: new Date("2023-08-25"),
      },
      {
        id: "doc-002",
        name: "MoU Draft",
        url: "/documents/mou-draft-001.pdf",
        uploadDate: new Date("2023-08-28"),
      },
    ],
    availablePositions: ["Software Developer", "UI/UX Designer", "QA Engineer"],
    requiredSkills: ["Java", "JavaScript", "React", "Node.js"],
  },
  {
    id: "loc-002",
    companyName: "Bank Nasional Indonesia",
    companyAddress: "Jl. Sudirman No. 10",
    companyCity: "Jakarta Pusat",
    companyProvince: "DKI Jakarta",
    companyPostalCode: "10220",
    companyWebsite: "www.bni.co.id",
    companyIndustry: "Banking & Finance",
    companyDescription: "One of Indonesia's largest state-owned banks offering a wide range of financial services.",
    contactPerson: "Siti Aminah",
    contactPosition: "Recruitment Specialist",
    contactEmail: "siti.aminah@bni.co.id",
    contactPhone: "081234567891",
    proposedBy: {
      id: "std-002",
      name: "Dewi Lestari",
      nim: "1234567891",
      major: "Sistem Informasi",
      email: "dewi.lestari@example.com",
    },
    submissionDate: new Date("2023-09-02"),
    status: "approved",
    reviewedBy: "Dr. Hadi Santoso",
    reviewDate: new Date("2023-09-05"),
    feedback: "Excellent opportunity for our students to gain experience in the banking sector.",
    documents: [
      {
        id: "doc-003",
        name: "Company Profile",
        url: "/documents/company-profile-002.pdf",
        uploadDate: new Date("2023-08-30"),
      },
      {
        id: "doc-004",
        name: "Internship Program Details",
        url: "/documents/internship-details-002.pdf",
        uploadDate: new Date("2023-08-31"),
      },
    ],
    availablePositions: ["IT Support", "Data Analyst", "Mobile App Developer"],
    requiredSkills: ["SQL", "Python", "Data Analysis", "Problem Solving"],
  },
  {
    id: "loc-003",
    companyName: "Rumah Sakit Medika",
    companyAddress: "Jl. Kesehatan No. 45",
    companyCity: "Bandung",
    companyProvince: "Jawa Barat",
    companyPostalCode: "40115",
    companyWebsite: "www.rsmedika.com",
    companyIndustry: "Healthcare",
    companyDescription: "A modern hospital providing comprehensive healthcare services with advanced technology.",
    contactPerson: "Dr. Bambang Wijaya",
    contactPosition: "IT Director",
    contactEmail: "bambang.wijaya@rsmedika.com",
    contactPhone: "081234567892",
    proposedBy: {
      id: "std-003",
      name: "Rini Susanti",
      nim: "1234567892",
      major: "Sistem Informasi",
      email: "rini.susanti@example.com",
    },
    submissionDate: new Date("2023-09-03"),
    status: "rejected",
    reviewedBy: "Dr. Hadi Santoso",
    reviewDate: new Date("2023-09-06"),
    feedback:
      "The proposed internship program does not align well with our curriculum objectives. Please revise the proposal to include more IT-related projects.",
    documents: [
      {
        id: "doc-005",
        name: "Company Profile",
        url: "/documents/company-profile-003.pdf",
        uploadDate: new Date("2023-09-01"),
      },
    ],
    availablePositions: ["Health Information System Specialist", "Database Administrator"],
    requiredSkills: ["Database Management", "Health Informatics", "System Administration"],
  },
  {
    id: "loc-004",
    companyName: "PT Media Digital",
    companyAddress: "Jl. Gatot Subroto No. 15",
    companyCity: "Jakarta Selatan",
    companyProvince: "DKI Jakarta",
    companyPostalCode: "12930",
    companyWebsite: "www.mediadigital.com",
    companyIndustry: "Media & Communication",
    companyDescription:
      "A digital media company specializing in content creation, digital marketing, and social media management.",
    contactPerson: "Rina Dewi",
    contactPosition: "HR Director",
    contactEmail: "rina.dewi@mediadigital.com",
    contactPhone: "081234567893",
    proposedBy: {
      id: "std-004",
      name: "Budi Santoso",
      nim: "1234567893",
      major: "Informatika",
      email: "budi.santoso@example.com",
    },
    submissionDate: new Date("2023-09-04"),
    status: "pending",
    documents: [
      {
        id: "doc-006",
        name: "Company Profile",
        url: "/documents/company-profile-004.pdf",
        uploadDate: new Date("2023-09-02"),
      },
      {
        id: "doc-007",
        name: "Internship Program Details",
        url: "/documents/internship-details-004.pdf",
        uploadDate: new Date("2023-09-03"),
      },
    ],
    availablePositions: ["Web Developer", "Digital Marketing Specialist", "Content Creator"],
    requiredSkills: ["HTML/CSS", "JavaScript", "Social Media Management", "Content Creation"],
  },
  {
    id: "loc-005",
    companyName: "PT Logistik Cepat",
    companyAddress: "Jl. Raya Bekasi Km. 25",
    companyCity: "Bekasi",
    companyProvince: "Jawa Barat",
    companyPostalCode: "17112",
    companyWebsite: "www.logistikcepat.com",
    companyIndustry: "Logistics & Transportation",
    companyDescription: "A logistics company providing comprehensive supply chain solutions across Indonesia.",
    contactPerson: "Hendra Wijaya",
    contactPosition: "IT Manager",
    contactEmail: "hendra.wijaya@logistikcepat.com",
    contactPhone: "081234567894",
    proposedBy: {
      id: "std-005",
      name: "Siti Nurhaliza",
      nim: "1234567894",
      major: "Sistem Informasi",
      email: "siti.nurhaliza@example.com",
    },
    submissionDate: new Date("2023-09-05"),
    status: "pending",
    documents: [
      {
        id: "doc-008",
        name: "Company Profile",
        url: "/documents/company-profile-005.pdf",
        uploadDate: new Date("2023-09-04"),
      },
    ],
    availablePositions: ["Supply Chain Analyst", "IT Support Specialist", "System Developer"],
    requiredSkills: ["Data Analysis", "Logistics Management", "Problem Solving", "SQL"],
  },
]

// Function to get all KKP location requests
export async function getKkpLocationRequests() {
  // In a real app, this would fetch from a database
  return MOCK_KKP_LOCATION_REQUESTS
}

// Function to get KKP location requests by status
export async function getKkpLocationRequestsByStatus(status: KkpLocationStatus) {
  // In a real app, this would fetch from a database with filtering
  return MOCK_KKP_LOCATION_REQUESTS.filter((req) => req.status === status)
}

// Function to get a single KKP location request by ID
export async function getKkpLocationRequestById(id: string) {
  // In a real app, this would fetch from a database
  return MOCK_KKP_LOCATION_REQUESTS.find((req) => req.id === id) || null
}

// Function to update KKP location request status
export async function updateKkpLocationRequestStatus(
  id: string,
  newStatus: KkpLocationStatus,
  reviewerId: string,
  reviewerName: string,
  feedback?: string,
) {
  try {
    // In a real app, this would update a database record
    const requestIndex = MOCK_KKP_LOCATION_REQUESTS.findIndex((req) => req.id === id)

    if (requestIndex === -1) {
      return { success: false, message: "Location request not found" }
    }

    // Update the request status
    MOCK_KKP_LOCATION_REQUESTS[requestIndex].status = newStatus
    MOCK_KKP_LOCATION_REQUESTS[requestIndex].reviewedBy = reviewerName
    MOCK_KKP_LOCATION_REQUESTS[requestIndex].reviewDate = new Date()

    // Add feedback if provided
    if (feedback) {
      MOCK_KKP_LOCATION_REQUESTS[requestIndex].feedback = feedback
    }

    // Revalidate the paths to refresh the UI
    revalidatePath("/dashboard/prodi/internship-approval")
    revalidatePath("/dashboard/prodi/kkp-locations")

    return {
      success: true,
      message: `Location request status updated to ${newStatus}`,
      request: MOCK_KKP_LOCATION_REQUESTS[requestIndex],
    }
  } catch (error) {
    console.error("Error updating KKP location request status:", error)
    return { success: false, message: "Failed to update location request status" }
  }
}

// Function to submit a new KKP location request
export async function submitKkpLocationRequest(requestData: Partial<KkpLocationRequest>) {
  try {
    // In a real app, this would create a new record in the database

    // Generate a new ID
    const newId = `loc-${String(MOCK_KKP_LOCATION_REQUESTS.length + 1).padStart(3, "0")}`

    // Create the new request object
    const newRequest: KkpLocationRequest = {
      id: newId,
      companyName: requestData.companyName || "",
      companyAddress: requestData.companyAddress || "",
      companyCity: requestData.companyCity || "",
      companyProvince: requestData.companyProvince,
      companyPostalCode: requestData.companyPostalCode,
      companyWebsite: requestData.companyWebsite,
      companyIndustry: requestData.companyIndustry || "",
      companyDescription: requestData.companyDescription,
      contactPerson: requestData.contactPerson || "",
      contactPosition: requestData.contactPosition,
      contactEmail: requestData.contactEmail || "",
      contactPhone: requestData.contactPhone || "",
      proposedBy: requestData.proposedBy!,
      submissionDate: new Date(),
      status: "pending",
      documents: requestData.documents || [],
      availablePositions: requestData.availablePositions || [],
      requiredSkills: requestData.requiredSkills || [],
    }

    // Add the new request to the mock data
    MOCK_KKP_LOCATION_REQUESTS.push(newRequest)

    // Revalidate the paths to refresh the UI
    revalidatePath("/dashboard/mahasiswa/kkp/locations")
    revalidatePath("/dashboard/prodi/kkp-locations")

    return {
      success: true,
      message: "KKP location request submitted successfully",
      request: newRequest,
    }
  } catch (error) {
    console.error("Error submitting KKP location request:", error)
    return { success: false, message: "Failed to submit KKP location request" }
  }
}

