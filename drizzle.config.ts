import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/drizzle.ts',
	strict: true,
	verbose: true,
})
