import { db, users } from '@/lib/drizzle'
import { eq } from 'drizzle-orm'
import { NextAuthOptions, User as NextAuthUser, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

interface User extends NextAuthUser {
	id: string
	username: string
}

const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials) throw new Error('Invalid form input')

				const [user] = await db
					.select()
					.from(users)
					.where(eq(users.username, credentials.username))
					.limit(1)

				if (!user) {
					throw new Error('No user found with this username')
				}

				const isValid = credentials.password === user.password

				if (!isValid) {
					throw new Error('Invalid password')
				}

				const userToReturn: User = {
					username: user.username as string,
					id: user.id.toString(),
				}

				return userToReturn
			},
		}),
	],
	pages: {
		signIn: '/auth/signin',
	},
	callbacks: {
		// @ts-ignore
		async jwt({ token, user }: { token: JWT; user?: User }) {
			if (user) {
				token.id = user.id
				token.username = user.username
			}
			return token
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			if (token) {
				session.user = {
					id: token.id as string,
					username: token.username as string,
				}
			}
			return session
		},
	},
}

export default authOptions
