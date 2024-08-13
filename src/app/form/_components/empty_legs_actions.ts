'use server'

import { db, emptyLegs } from '@/lib/drizzle'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

async function PostEmptyLeg(emptyLeg: typeof emptyLegs.$inferInsert) {
	await db.insert(emptyLegs).values(emptyLeg)
	revalidatePath('page')
}

async function UpdateEmptyLeg(emptyLeg: typeof emptyLegs.$inferSelect) {
	await db.update(emptyLegs).set(emptyLeg).where(eq(emptyLegs.id, emptyLeg.id))
	revalidatePath('page')
}

async function DeleteEmptyLeg(id: number) {
	await db.delete(emptyLegs).where(eq(emptyLegs.id, id))
	revalidatePath('page')
}

export { DeleteEmptyLeg, PostEmptyLeg, UpdateEmptyLeg }
