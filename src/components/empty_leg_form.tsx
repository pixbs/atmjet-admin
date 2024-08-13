'use client'

import { emptyLegs } from '@/lib/drizzle'
import { useForm } from 'react-hook-form'
import { CardContent, CardFooter } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface EmptyLegListProps {
	onSubmit: (data: typeof emptyLegs.$inferInsert) => void
	defaultValues?: typeof emptyLegs.$inferSelect
	children?: React.ReactNode
}

export function EmptyLegForm(props: EmptyLegListProps) {
	const { onSubmit, defaultValues } = props

	const methods = useForm<typeof emptyLegs.$inferSelect>({
		defaultValues,
	})
	const { register, handleSubmit, reset } = methods

	const validate = (data: typeof emptyLegs.$inferInsert) => {
		const emptyLeg = data
		emptyLeg.start = new Date(data.start)
		emptyLeg.end = new Date(data.end)
		if (!emptyLeg.price) {
			emptyLeg.price = 0
		}
		if (!emptyLeg.order) {
			emptyLeg.order = 0
		}
		onSubmit(emptyLeg)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(validate)}>
			<CardContent className='grid grid-cols-1 gap-2 md:grid-cols-2'>
				<div>
					<Label htmlFor='from'>From:</Label>
					<Input
						type='text'
						maxLength={4}
						id='from'
						required
						placeholder='4-letter ICAO code'
						{...register('from')}
					/>
				</div>
				<div>
					<Label htmlFor='to'>To:</Label>
					<Input
						type='text'
						maxLength={4}
						id='to'
						required
						placeholder='4-letter ICAO code'
						{...register('to')}
					/>
				</div>
				<div>
					<Label htmlFor='start'>Start:</Label>
					<Input type='date' id='start' required placeholder='YYYY-MM-DD' {...register('start')} />
				</div>
				<div>
					<Label htmlFor='end'>End:</Label>
					<Input type='date' id='end' required placeholder='YYYY-MM-DD' {...register('end')} />
				</div>
				<div className='md:col-span-2'>
					<Label htmlFor='price'>Price:</Label>
					<Input type='number' id='price' min='0' required placeholder='0' {...register('price')} />
				</div>
				<div>
					<Label htmlFor='type'>Type:</Label>
					<Input type='text' id='type' placeholder='Type of aircraft' {...register('type')} />
				</div>
				<div>
					<Label htmlFor='category'>Category:</Label>
					<Input type='text' id='category' {...register('category')} />
				</div>
				<div>
					<Label htmlFor='company'>Company:</Label>
					<Input type='text' id='company' placeholder='Name of company' {...register('company')} />
				</div>
				<div>
					<Label htmlFor='safety'>Safety:</Label>
					<Input type='text' id='safety' {...register('safety')} />
				</div>
				<div>
					<Label htmlFor='order'>Order:</Label>
					<Input
						type='number'
						id='order'
						min={0}
						placeholder='Order to display'
						{...register('order')}
					/>
				</div>
			</CardContent>
			<CardFooter className='flex justify-between'>{props.children}</CardFooter>
		</form>
	)
}
