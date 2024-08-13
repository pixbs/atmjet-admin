'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
		<section className='flex h-screen flex-col items-center justify-center'>
			<div className='flex max-w-screen-sm flex-col gap-4'>
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
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
		</section>
	)
}
