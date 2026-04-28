import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '@db-client'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')
  // Add your seed logic here
  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
