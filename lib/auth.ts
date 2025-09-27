import { NextAuthOptions, getServerSession } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        nidn: { label: 'NIDN', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.nidn || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            nidn: credentials.nidn
          },
          include: {
            studentProfile: true,
            lecturerProfile: true,
            staffProfile: true
          }
        })

        if (!user || !user.isActive) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          nidn: user.nidn,
          name: user.name,
          role: user.role,
          subRole: user.subRole,
          avatar: user.avatar,
          profile: user.studentProfile || user.lecturerProfile || user.staffProfile
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
        token.nidn = user.nidn
        token.profile = user.profile
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.sub!
      session.user.role = token.role as string
      session.user.subRole = token.subRole as string
      session.user.nidn = token.nidn as string
      session.user.profile = token.profile
      return session
    }
  },
  pages: {
    signIn: '/auth/login'
  }
}

export const getServerAuthSession = () => getServerSession(authOptions)