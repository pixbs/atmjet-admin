'use client'

import { EmptyLegForm } from '@/components/empty_leg_form'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { emptyLegs } from '@/lib/drizzle'
import { SubmitHandler } from 'react-hook-form'
import { PostEmptyLeg } from './empty_legs_actions'

function AddEmptyLeg() {
	const onSubmit: SubmitHandler<typeof emptyLegs.$inferInsert> = async (data) => {
		PostEmptyLeg(data)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Add new empty leg</CardTitle>
				<CardDescription>Fill in the form to add a new empty leg</CardDescription>
			</CardHeader>
			<EmptyLegForm onSubmit={onSubmit}>
				<Button type='submit' className='w-full'>
					Add Empty Leg
				</Button>
			</EmptyLegForm>
		</Card>
	)
}

export default AddEmptyLeg
