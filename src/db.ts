import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { CamelCasePlugin, Kysely } from 'kysely'
import { NeonDialect } from 'kysely-neon'
import type { DB } from './lib/types/generated/kysely-codegen/db.d.ts'

export const db = new Kysely<DB>({
  dialect: new NeonDialect({
    neon: neon(process.env.DATABASE_URL!),
  }),
  plugins: [new CamelCasePlugin()],
})
