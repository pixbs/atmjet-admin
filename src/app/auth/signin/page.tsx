'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Page() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		await signIn('credentials', {
			redirect: true,
			username,
			password,
			callbackUrl: '/form',
		})
	}

	return (
		<div>
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<Input
					type='username'
					placeholder='Username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button type='submit'>Sign In</Button>
			</form>
		</div>
	)
}
