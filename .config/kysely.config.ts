import { defineConfig, getKnexTimestampPrefix } from "kysely-ctl"
import { db } from "../src/db"

export default defineConfig({
  kysely: db,
  migrations: {
    getMigrationPrefix: getKnexTimestampPrefix,
    migrationFolder: "../db/",
  },
})
