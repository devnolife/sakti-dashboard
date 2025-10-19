import crypto from 'crypto'

/**
 * Hash password menggunakan MD5
 * Untuk compatibility dengan sistem GraphQL yang menggunakan MD5
 */
export function md5Hash(text: string): string {
  return crypto.createHash('md5').update(text).digest('hex')
}

/**
 * Verify password dengan MD5 hash
 */
export function verifyMd5Password(plainPassword: string, hashedPassword: string): boolean {
  const hashed = md5Hash(plainPassword)
  return hashed === hashedPassword
}
