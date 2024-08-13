'use server'

import { db, emptyLegs } from "@/lib/drizzle";

async function PostEmptyLeg(emptyLeg: typeof emptyLegs.$inferInsert) {
    await db.insert(emptyLegs).values(emptyLeg)
}

export default PostEmptyLeg