import authOptions from '@/lib/auth'
import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			username: string
		}
	}

	interface JWT {
		id: string
		username: string
	}
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
