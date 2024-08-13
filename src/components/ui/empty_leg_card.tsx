'use client'

import { DeleteEmptyLeg, UpdateEmptyLeg } from '@/app/form/_components/empty_legs_actions'
import { emptyLegs } from '@/lib/drizzle'
import { useState } from 'react'
import { EmptyLegForm } from '../empty_leg_form'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

type EmptyLeg = typeof emptyLegs.$inferSelect

function EmptyLegCard(props: EmptyLeg) {
	const [editing, setEditing] = useState(false)

	return (
		<Card className={editing ? 'md:col-span-2' : ''}>
			<CardHeader>
				<CardTitle>
					{props.from.toUpperCase()} - {props.to.toUpperCase()}
				</CardTitle>
				<CardDescription>
					{props.start.toDateString()} - {props.end.toDateString()}
				</CardDescription>
			</CardHeader>
			{editing ? (
				<EditView onEdit={setEditing} {...props} />
			) : (
				<ReadView onEdit={setEditing} {...props} />
			)}
		</Card>
	)
}

interface ReadViewProps extends EmptyLeg {
	onEdit: (editing: boolean) => void
}

function ReadView(props: ReadViewProps) {
	const handleDelete = () => {
		DeleteEmptyLeg(props.id)
	}

	return (
		<>
			<CardContent>
				<table className='w-full'>
					<tbody>
						<tr>
							<td>Price:</td>
							<td>${props.price?.toLocaleString()}</td>
						</tr>
						<tr>
							<td>Type:</td>
							<td>{props.type}</td>
						</tr>
						<tr>
							<td>Category:</td>
							<td>{props.category}</td>
						</tr>
						<tr>
							<td>Company:</td>
							<td>{props.company}</td>
						</tr>
						<tr>
							<td>Id:</td>
							<td>{props.id}</td>
						</tr>
					</tbody>
				</table>
			</CardContent>
			<CardFooter className='flex justify-between'>
				<Button onClick={handleDelete} variant='outline'>
					Delete
				</Button>
				<Button onClick={() => props.onEdit(true)} variant='outline'>
					Edit
				</Button>
			</CardFooter>
		</>
	)
}

function EditView(props: ReadViewProps) {
	const { onEdit, ...emptyLegProps } = props

	const onSubmit = (data: typeof emptyLegs.$inferInsert) => {
		console.log(data)
		const emptyLeg = { ...emptyLegProps, ...data }
		UpdateEmptyLeg(emptyLeg)
		props.onEdit(false)
	}

	return (
		<>
			<EmptyLegForm defaultValues={emptyLegProps} onSubmit={onSubmit}>
				<Button variant='outline' onClick={() => props.onEdit(false)}>
					Cancel
				</Button>
				<Button type='submit'>Save</Button>
			</EmptyLegForm>
		</>
	)
}

export default EmptyLegCard
