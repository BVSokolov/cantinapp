import { defineConfig, getKnexTimestampPrefix } from "kysely-ctl"
import { db } from "../src/db/db"

export default defineConfig({
  kysely: db,
  migrations: {
    getMigrationPrefix: getKnexTimestampPrefix,
    migrationFolder: "../src/db/migrations",
  },
})
