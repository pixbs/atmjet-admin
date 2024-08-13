'use client'

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
		<ul className='space-y-4'>
			{legs.map((leg) => (
				<li key={leg.id} className='rounded border p-4'>
					{editingId === leg.id ? (
						<div>
							<div>
								<label htmlFor='from'>From:</label>
								<input
									type='text'
									id='from'
									name='from'
									value={editedLeg?.from || ''}
									onChange={handleChange}
									maxLength={4}
								/>
							</div>
							<div>
								<label htmlFor='to'>To:</label>
								<input
									type='text'
									id='to'
									name='to'
									value={editedLeg?.to || ''}
									onChange={handleChange}
									maxLength={4}
								/>
							</div>
							<div>
								<label htmlFor='start'>Start:</label>
								<input
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
								<label htmlFor='end'>End:</label>
								<input
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
								<label htmlFor='price'>Price:</label>
								<input
									type='number'
									id='price'
									name='price'
									value={editedLeg?.price || 0}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label htmlFor='type'>Type:</label>
								<input
									type='text'
									id='type'
									name='type'
									value={editedLeg?.type || ''}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label htmlFor='category'>Category:</label>
								<input
									type='text'
									id='category'
									name='category'
									value={editedLeg?.category || ''}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label htmlFor='company'>Company:</label>
								<input
									type='text'
									id='company'
									name='company'
									value={editedLeg?.company || ''}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label htmlFor='safety'>Safety:</label>
								<input
									type='text'
									id='safety'
									name='safety'
									value={editedLeg?.safety || ''}
									onChange={handleChange}
								/>
							</div>
							<div>
								<label htmlFor='order'>Order:</label>
								<input
									type='number'
									id='order'
									name='order'
									value={editedLeg?.order || 0}
									onChange={handleChange}
								/>
							</div>
							<button onClick={handleSaveClick} className='mr-4 text-blue-500'>
								Save
							</button>
							<button onClick={() => setEditingId(null)} className='text-gray-500'>
								Cancel
							</button>
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
							<button onClick={() => handleEditClick(leg)} className='mr-4 text-blue-500'>
								Edit
							</button>
							<button onClick={() => handleDeleteClick(leg.id)} className='text-red-500'>
								Delete
							</button>
						</div>
					)}
				</li>
			))}
		</ul>
	)
}

export default EmptyLegList
