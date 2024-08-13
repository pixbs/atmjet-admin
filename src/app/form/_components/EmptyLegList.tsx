'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

type EmptyLeg = {
	id: number
	start: Date
	end: Date
	from: string
	to: string
	type: string | null
	category: string | null
	company: string | null
	safety: string | null
	price: number | null
	order: number | null
}

type EmptyLegListProps = {
	legs: EmptyLeg[]
	onDelete: (id: number) => Promise<void>
	onEdit: (leg: EmptyLeg) => void
}

const EmptyLegList: React.FC<EmptyLegListProps> = ({ legs, onDelete, onEdit }) => {
	const [editingId, setEditingId] = useState<number | null>(null)
	const [editedLeg, setEditedLeg] = useState<Partial<EmptyLeg> | null>(null)

	const handleEditClick = (leg: EmptyLeg) => {
		setEditingId(leg.id)
		setEditedLeg(leg)
	}

	const handleSaveClick = async () => {
		if (editedLeg) {
			await onEdit(editedLeg as EmptyLeg)
			setEditingId(null)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditedLeg({ ...editedLeg, [e.target.name]: e.target.value })
	}

	const handleDeleteClick = async (id: number) => {
		if (confirm('Are you sure you want to delete this empty leg?')) {
			await onDelete(id)
		}
	}

	return (
		<ul className='gap-y-4'>
			{legs.map((leg) => (
				<li key={leg.id} className='rounded border p-4'>
					{editingId === leg.id ? (
						<div>
							<div>
								<Label htmlFor='from'>From:</Label>
								<Input
									type='text'
									id='from'
									name='from'
									value={editedLeg?.from || ''}
									onChange={handleChange}
									maxLength={4}
								/>
							</div>
							<div>
								<Label htmlFor='to'>To:</Label>
								<Input
									type='text'
									id='to'
									name='to'
									value={editedLeg?.to || ''}
									onChange={handleChange}
									maxLength={4}
								/>
							</div>
							<div>
								<Label htmlFor='start'>Start:</Label>
								<Input
									type='datetime-local'
									id='start'
									name='start'
									value={
										(editedLeg?.start &&
											new Date(editedLeg.start).toISOString().substring(0, 16)) ||
										''
									}
									onChange={handleChange}
								/>
							</div>
							<div>
								<Label htmlFor='end'>End:</Label>
								<Input
									type='datetime-local'
									id='end'
									name='end'
									value={
										(editedLeg?.end && new Date(editedLeg.end).toISOString().substring(0, 16)) || ''
									}
									onChange={handleChange}
								/>
							</div>
							<div>
								<Label htmlFor='price'>Price:</Label>
								<Input
									type='number'
									id='price'
									name='price'
									value={editedLeg?.price || 0}
									onChange={handleChange}
								/>
							</div>
							<div>
								<Label htmlFor='type'>Type:</Label>
								<Input
									type='text'
									id='type'
									name='type'
									value={editedLeg?.type || ''}
									onChange={handleChange}
								/>
							</div>
							<div>
								<Label htmlFor='category'>Category:</Label>
								<Input
									type='text'
									id='category'
									name='category'
									value={editedLeg?.category || ''}
									onChange={handleChange}
								/>
							</div>
							<div>
								<Label htmlFor='company'>Company:</Label>
								<Input
									type='text'
									id='company'
									name='company'
									value={editedLeg?.company || ''}
									onChange={handleChange}
								/>
							</div>
							<div>
								<Label htmlFor='safety'>Safety:</Label>
								<Input
									type='text'
									id='safety'
									name='safety'
									value={editedLeg?.safety || ''}
									onChange={handleChange}
								/>
							</div>
							<div>
								<Label htmlFor='order'>Order:</Label>
								<Input
									type='number'
									id='order'
									name='order'
									value={editedLeg?.order || 0}
									onChange={handleChange}
								/>
							</div>
							<Button onClick={handleSaveClick} className='mr-4 text-blue-500'>
								Save
							</Button>
							<Button onClick={() => setEditingId(null)} className='text-gray-500'>
								Cancel
							</Button>
						</div>
					) : (
						<div>
							<p>
								<strong>From:</strong> {leg.from}
							</p>
							<p>
								<strong>To:</strong> {leg.to}
							</p>
							<p>
								<strong>Start:</strong> {new Date(leg.start).toLocaleString()}
							</p>
							<p>
								<strong>End:</strong> {new Date(leg.end).toLocaleString()}
							</p>
							<p>
								<strong>Price:</strong> ${leg.price || 0}
							</p>
							{leg.type && (
								<p>
									<strong>Type:</strong> {leg.type}
								</p>
							)}
							{leg.category && (
								<p>
									<strong>Category:</strong> {leg.category}
								</p>
							)}
							{leg.company && (
								<p>
									<strong>Company:</strong> {leg.company}
								</p>
							)}
							{leg.safety && (
								<p>
									<strong>Safety:</strong> {leg.safety}
								</p>
							)}
							{leg.order !== null && (
								<p>
									<strong>Order:</strong> {leg.order}
								</p>
							)}
							<Button onClick={() => handleEditClick(leg)} className='mr-4 text-blue-500'>
								Edit
							</Button>
							<Button onClick={() => handleDeleteClick(leg.id)} className='text-red-500'>
								Delete
							</Button>
						</div>
					)}
				</li>
			))}
		</ul>
	)
}

export default EmptyLegList
