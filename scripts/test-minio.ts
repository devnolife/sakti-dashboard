/**
 * Test MinIO Connection
 * Run: npm run minio:test
 */

import * as Minio from 'minio'

async function testMinioConnection() {
  console.log('🔍 Testing MinIO Connection...\n')

  // Create MinIO client - use IP for API connection
  const minioClient = new Minio.Client({
    endPoint: '103.151.145.21',
    port: 990,
    useSSL: false,
    accessKey: 'NfTGaBQHPnetL8lNZvrb',
    secretKey: 'B2ypIasMJA3zD3ofbneA9Ov3brvF3m37cvz6KYsj',
  })

  const bucketName = 'simtekmu'

  console.log('📋 MinIO Configuration:')
  console.log('   API Endpoint: 103.151.145.21:990 (HTTP)')
  console.log('   Public URL: http://minio.if.unismuh.ac.id:9000')
  console.log('   Bucket: ', bucketName)
  console.log('')

  try {
    // Test 1: List buckets
    console.log('📦 Test 1: Listing buckets...')
    const buckets = await minioClient.listBuckets()
    console.log('✅ Connected! Found buckets:', buckets.map(b => b.name).join(', '))

    // Test 2: Check if our bucket exists
    console.log('\n📦 Test 2: Checking bucket existence...')
    const exists = await minioClient.bucketExists(bucketName)
    console.log(`✅ Bucket "${bucketName}" ${exists ? 'exists' : 'does not exist'}`)

    // Test 3: Initialize bucket (create if not exists)
    if (!exists) {
      console.log('\n📦 Test 3: Creating bucket...')
      await minioClient.makeBucket(bucketName, 'us-east-1')

      // Set bucket policy to allow public read
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
      console.log(`✅ Bucket "${bucketName}" created successfully`)
    } else {
      console.log('\n✅ Bucket is ready to use')
    }

    // Test 4: Upload test file
    console.log('\n📤 Test 4: Uploading test file...')
    const testContent = Buffer.from('Test file content - ' + new Date().toISOString())
    await minioClient.putObject(
      bucketName,
      'test-file.txt',
      testContent,
      testContent.length,
      {
        'Content-Type': 'text/plain',
      }
    )
    console.log('✅ Test file uploaded successfully')

    // Test 5: Generate URLs
    console.log('\n🔗 Test 5: Generating file URLs...')

    // Presigned URL (temporary, with IP)
    const presignedUrl = await minioClient.presignedGetObject(bucketName, 'test-file.txt', 60)
    console.log('✅ Presigned URL (temporary):')
    console.log('   ', presignedUrl)

    // Public URL (permanent, with domain)
    const publicUrl = `http://minio.if.unismuh.ac.id:9000/${bucketName}/test-file.txt`
    console.log('\n✅ Public URL (domain-based):')
    console.log('   ', publicUrl)
    console.log('\n💡 File URL yang digunakan di aplikasi akan menggunakan domain!')

    // Test 6: Delete test file
    console.log('\n🗑️  Test 6: Cleaning up test file...')
    await minioClient.removeObject(bucketName, 'test-file.txt')
    console.log('✅ Test file deleted')

    console.log('\n\n🎉 All tests passed! MinIO is configured correctly.')
    console.log('\n📝 Configuration:')
    console.log(`   Endpoint: ${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`)
    console.log(`   SSL: ${process.env.MINIO_USE_SSL}`)
    console.log(`   Bucket: ${bucketName}`)

  } catch (error) {
    console.error('\n❌ MinIO connection test failed!')
    console.error('Error:', error)
    console.error('\n💡 Tips:')
    console.error('   1. Check if MinIO server is running')
    console.error('   2. Verify credentials in .env file')
    console.error('   3. Check network/firewall settings')
    console.error('   4. Ensure port ' + process.env.MINIO_PORT + ' is accessible')
    process.exit(1)
  }
}

testMinioConnection()
