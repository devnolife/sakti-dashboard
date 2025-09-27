import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      nidn: string
      name: string
      email?: string
      role: string
      subRole?: string
      avatar?: string
      profile?: any
    }
  }

  interface User {
    id: string
    nidn: string
    name: string
    role: string
    subRole?: string
    avatar?: string
    profile?: any
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    subRole?: string
    nidn: string
    profile?: any
  }
}