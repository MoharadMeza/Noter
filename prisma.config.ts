import 'dotenv/config'
import { config } from 'dotenv'
import { defineConfig, env } from 'prisma/config'

// Load .env.local if it exists (for local overrides)
config({ path: '.env.local' })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
