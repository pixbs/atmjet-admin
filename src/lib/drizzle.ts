import { sql } from '@vercel/postgres'
import { config } from 'dotenv'
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { drizzle } from 'drizzle-orm/vercel-postgres'

config({ path: '.env.local' })

export const emptyLegs = pgTable('atmjet_admin__empty_legs', {
	id: serial('id').primaryKey(),
	start: timestamp('start', { withTimezone: true }).notNull(),
	end: timestamp('end', { withTimezone: true }).notNull(),
	from: varchar('from', { length: 4 }).notNull(),
	to: varchar('to', { length: 4 }).notNull(),
	type: varchar('type', { length: 255 }),
	category: varchar('category', { length: 255 }),
	company: varchar('company', { length: 255 }),
	safety: varchar('safety', { length: 255 }),
	price: integer('price').default(0),
	order: integer('order'),
})

export const users = pgTable('atmjet_admin__users', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 256 }).notNull(),
	password: text('password').notNull(),
})

export const db = drizzle(sql, { logger: true })