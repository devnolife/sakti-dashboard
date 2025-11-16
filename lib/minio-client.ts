import * as Minio from 'minio'

// MinIO client configuration
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin123',
})

const bucketName = process.env.MINIO_BUCKET_NAME || 'correspondence-files'

/**
 * Initialize MinIO bucket
 * Creates bucket if it doesn't exist
 */
export async function initializeBucket() {
  try {
    const exists = await minioClient.bucketExists(bucketName)

    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1')
      console.log(`✅ Bucket "${bucketName}" created successfully`)

      // Set bucket policy to allow public read (optional)
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: ['*'] },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${bucketName}/*`],
          },
        ],
      }
      await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy))
      console.log(`✅ Bucket policy set for "${bucketName}"`)
    } else {
      console.log(`✅ Bucket "${bucketName}" already exists`)
    }
  } catch (error) {
    console.error('❌ Error initializing bucket:', error)
    throw error
  }
}

/**
 * Upload file to MinIO
 * @param file - File buffer or stream
 * @param fileName - Name of the file
 * @param contentType - MIME type of the file
 * @returns Object URL of the uploaded file
 */
export async function uploadFile(
  file: Buffer | NodeJS.ReadableStream,
  fileName: string,
  contentType: string
): Promise<string> {
  try {
    // Generate unique file name with timestamp
    const timestamp = Date.now()
    const uniqueFileName = `${timestamp}-${fileName}`

    // Upload file to MinIO
    await minioClient.putObject(
      bucketName,
      uniqueFileName,
      file,
      {
        'Content-Type': contentType,
      }
    )

    // Generate presigned URL (valid for 7 days)
    const url = await minioClient.presignedGetObject(
      bucketName,
      uniqueFileName,
      7 * 24 * 60 * 60
    )

    console.log(`✅ File uploaded: ${uniqueFileName}`)
    return url
  } catch (error) {
    console.error('❌ Error uploading file:', error)
    throw error
  }
}

/**
 * Upload file from base64
 * @param base64Data - Base64 encoded file data (with or without data URI prefix)
 * @param fileName - Name of the file
 * @returns Object URL of the uploaded file
 */
export async function uploadFromBase64(
  base64Data: string,
  fileName: string
): Promise<string> {
  try {
    // Remove data URI prefix if present (e.g., "data:image/png;base64,")
    const base64Match = base64Data.match(/^data:(.+);base64,(.+)$/)
    let buffer: Buffer
    let contentType = 'application/octet-stream'

    if (base64Match) {
      contentType = base64Match[1]
      buffer = Buffer.from(base64Match[2], 'base64')
    } else {
      buffer = Buffer.from(base64Data, 'base64')
    }

    return await uploadFile(buffer, fileName, contentType)
  } catch (error) {
    console.error('❌ Error uploading from base64:', error)
    throw error
  }
}

/**
 * Delete file from MinIO
 * @param fileName - Name of the file to delete
 */
export async function deleteFile(fileName: string): Promise<void> {
  try {
    await minioClient.removeObject(bucketName, fileName)
    console.log(`✅ File deleted: ${fileName}`)
  } catch (error) {
    console.error('❌ Error deleting file:', error)
    throw error
  }
}

/**
 * Get presigned URL for a file
 * @param fileName - Name of the file
 * @param expirySeconds - URL expiry time in seconds (default: 7 days)
 * @returns Presigned URL
 */
export async function getFileUrl(
  fileName: string,
  expirySeconds: number = 7 * 24 * 60 * 60
): Promise<string> {
  try {
    const url = await minioClient.presignedGetObject(
      bucketName,
      fileName,
      expirySeconds
    )
    return url
  } catch (error) {
    console.error('❌ Error generating presigned URL:', error)
    throw error
  }
}

/**
 * List all files in bucket
 */
export async function listFiles(): Promise<string[]> {
  try {
    const stream = minioClient.listObjects(bucketName, '', true)
    const files: string[] = []

    return new Promise((resolve, reject) => {
      stream.on('data', (obj) => {
        if (obj.name) files.push(obj.name)
      })
      stream.on('error', reject)
      stream.on('end', () => resolve(files))
    })
  } catch (error) {
    console.error('❌ Error listing files:', error)
    throw error
  }
}

export { minioClient, bucketName }
