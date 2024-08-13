import EmptyLegCard from '@/components/ui/empty_leg_card'
import authOptions from '@/lib/auth'
import { db, emptyLegs } from '@/lib/drizzle'
import { eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth/next'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import AddEmptyLeg from './_components/empty_leg_form'

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

	const legs: EmptyLeg[] = await db.select().from(emptyLegs).orderBy(emptyLegs.order)

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
		<section className='flex flex-col items-center justify-center'>
			<main className='container flex max-w-screen-sm flex-col gap-2 py-20'>
				<h1 className='pb-4'>Manage Empty Legs</h1>
				<AddEmptyLeg />
				<div className='grid gap-2 md:grid-cols-2'>
					<h2 className='pt-8 md:col-span-2'>Existing empty legs</h2>
					{legs.map((leg) => (
						<EmptyLegCard {...leg} />
					))}
				</div>
			</main>
		</section>
	)
}

export default EmptyLegPage
