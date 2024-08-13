import EmptyLegList from '@/app/form/_components/EmptyLegList'
import authOptions from '@/lib/auth'
import { db, emptyLegs } from '@/lib/drizzle'
import { eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth/next'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import EmptyLegForm from './_components/empty_leg_form'

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

const EmptyLegPage = async () => {
	const session = await getServerSession(authOptions)

	if (!session) {
		return redirect('/auth/signin')
	}

	const legs: EmptyLeg[] = await db.select().from(emptyLegs)

	const deleteEmptyLeg = async (id: number) => {
		'use server'
		await db.delete(emptyLegs).where(eq(emptyLegs.id, id))
		revalidatePath('page')
	}

	const editEmptyLeg = async (leg: EmptyLeg) => {
		'use server'
		await db.update(emptyLegs).set(leg).where(eq(emptyLegs.id, leg.id))
		revalidatePath('page')
	}

	return (
		<div className='container mx-auto py-8'>
			<h1 className='mb-4 text-2xl font-bold'>Manage Empty Legs</h1>
			<div className='mt-8'>
				<h2 className='mb-4 text-xl font-semibold'>Existing Legs</h2>
				<EmptyLegList legs={legs} onDelete={deleteEmptyLeg} onEdit={editEmptyLeg} />
			</div>
            <div className='mt-8'>

                <EmptyLegForm/>
            </div>
		</div>
	)
}

export default EmptyLegPage