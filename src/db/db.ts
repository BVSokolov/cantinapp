import "dotenv/config";

import { CamelCasePlugin, Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";
import { neon } from "@neondatabase/serverless";
import { DB } from "./generated/kysely-codegen/db";

const connectionString = `${process.env.DATABASE_URL}`;

export const db = new Kysely<DB>({
  dialect: new NeonDialect({
    neon: neon(connectionString),
  }),
  plugins: [new CamelCasePlugin()],
});
