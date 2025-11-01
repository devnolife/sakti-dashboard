import { NextAuthOptions, getServerSession } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { syncStudentDataFromGraphQL } from './graphql/sync-student-data'
import { syncDosenDataFromGraphQL } from './graphql/sync-dosen-data'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await prisma.users.findUnique({
          where: {
            username: credentials.username
          },
          include: {
            students: true,
            lecturers: true,
            staff: true
          }
        })

        if (!user || !user.is_active) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        // Sync student data from GraphQL API after successful login
        if (user.role === 'mahasiswa' && user.students?.nim) {
          try {
            await syncStudentDataFromGraphQL(user.students.nim)
            console.log(`✅ Student data synced for NIM: ${user.students.nim}`)
          } catch (error) {
            console.error('❌ Failed to sync student data:', error)
            // Continue with login even if sync fails
          }
        }

        // Sync dosen data from GraphQL API after successful login
        if (user.role === 'dosen' && user.lecturers?.nip) {
          try {
            const result = await syncDosenDataFromGraphQL(user.lecturers.nip)
            if (result.success) {
              console.log(`✅ Dosen data synced for NIP: ${user.lecturers.nip}`)
            } else {
              console.log(`⏭️ Dosen data sync skipped: ${result.error}`)
            }
          } catch (error) {
            console.error('❌ Failed to sync dosen data:', error)
            // Continue with login even if sync fails
          }
        }

        return {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
          sub_role: user.sub_role || undefined,
          avatar: user.avatar || undefined,
          profile: user.students || user.lecturers || user.staff
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.subRole = user.subRole
        token.username = user.username
        token.profile = user.profile
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.sub!
      session.user.role = token.role as string
      session.user.subRole = token.subRole as string
      session.user.username = token.username as string
      session.user.profile = token.profile
      return session
    }
  },
  pages: {
    signIn: '/auth/login'
  }
}

export const getServerAuthSession = () => getServerSession(authOptions)
