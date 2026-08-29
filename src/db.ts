import 'dotenv/config'
import { neonConfig, Pool } from '@neondatabase/serverless'
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import type { Pool as PgPool } from 'pg'
import { WebSocket } from 'ws'
import type { DB } from './lib/types/generated/kysely-codegen/db.d.ts'

neonConfig.webSocketConstructor = WebSocket

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL!,
    }) as unknown as PgPool,
  }),
  plugins: [new CamelCasePlugin()],
})
