// Global data store for KKP applications (simulation only - in production use database)

interface GeneratedDocument {
  filePath: string
  no_surat: string
  prodi: string
  message: string
  downloadUrl: string
}

interface KkpApplicationData {
  id: string
  studentName: string
  studentNim: string
  status: "pending" | "approved" | "rejected" | "pending_wd1" | "approved_wd1" | "rejected_wd1"
  generatedDocument?: GeneratedDocument
  approvalDate?: Date
}

// In-memory storage for simulation (will persist during app runtime)
class KkpDataStore {
  private applications: Map<string, KkpApplicationData> = new Map()

  // Initialize with some default data
  constructor() {
    // Default application for simulation - initially pending WD1 approval
    this.applications.set("kkp-2024-001", {
      id: "kkp-2024-001",
      studentName: "Ahmad Fauzi", 
      studentNim: "1234567890",
      status: "pending_wd1"
    })
    
    console.log("KKP Data Store initialized with application: kkp-2024-001")
  }

  // Get application by ID
  getApplication(id: string): KkpApplicationData | null {
    return this.applications.get(id) || null
  }

  // Update application status
  updateApplicationStatus(id: string, status: KkpApplicationData['status']) {
    const app = this.applications.get(id)
    if (app) {
      app.status = status
      this.applications.set(id, app)
    }
  }

  // Set generated document for application
  setGeneratedDocument(id: string, documentData: any) {
    const app = this.applications.get(id)
    if (app) {
      app.generatedDocument = {
        filePath: documentData.filePath,
        no_surat: documentData.no_surat,
        prodi: documentData.prodi,
        message: documentData.message,
        downloadUrl: `http://localhost:8080${documentData.downloadUrl}` // Use new API response format
      }
      app.status = "approved_wd1"
      app.approvalDate = new Date()
      this.applications.set(id, app)
      
      console.log(`Document generated and stored for application ${id}:`, app.generatedDocument)
    }
  }

  // Get all applications for a student (by NIM)
  getApplicationsByStudent(nim: string): KkpApplicationData[] {
    return Array.from(this.applications.values()).filter(app => app.studentNim === nim)
  }

  // Get all applications
  getAllApplications(): KkpApplicationData[] {
    return Array.from(this.applications.values())
  }

  // Create new application
  createApplication(data: KkpApplicationData) {
    this.applications.set(data.id, data)
  }

  // Check if student has approved application with generated document
  getApprovedApplicationWithDocument(nim: string): KkpApplicationData | null {
    const apps = this.getApplicationsByStudent(nim)
    return apps.find(app => app.status === "approved_wd1" && app.generatedDocument) || null
  }
}

// Global instance - this will persist during app runtime
const kkpDataStore = new KkpDataStore()

export { kkpDataStore, type KkpApplicationData, type GeneratedDocument }