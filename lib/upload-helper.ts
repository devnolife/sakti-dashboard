/**
 * Upload file to MinIO via API
 * @param file - File object from input
 * @returns URL of uploaded file
 */
export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('fileName', file.name)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.details || 'Failed to upload file')
  }

  const data = await response.json()
  return data.url
}

/**
 * Upload base64 data to MinIO via API
 * @param base64Data - Base64 encoded file data
 * @param fileName - Name for the file
 * @returns URL of uploaded file
 */
export async function uploadBase64(base64Data: string, fileName: string): Promise<string> {
  const formData = new FormData()
  formData.append('base64', base64Data)
  formData.append('fileName', fileName)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.details || 'Failed to upload file')
  }

  const data = await response.json()
  return data.url
}

/**
 * Upload multiple files to MinIO
 * @param files - Array of File objects
 * @returns Array of URLs
 */
export async function uploadMultipleFiles(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(file => uploadFile(file))
  return await Promise.all(uploadPromises)
}

/**
 * Convert File to base64 string
 * @param file - File object
 * @returns Promise<string> - Base64 encoded string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to convert file to base64'))
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
