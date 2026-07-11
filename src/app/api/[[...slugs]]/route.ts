import { Elysia, t } from "elysia"

export const API_PREFIX = "/api/v1"

const app = new Elysia({ prefix: API_PREFIX })
  .get("/", { data: "Hello Nextjs" })
  .post("/", ({ body }) => body, {
    body: t.Object({ name: t.String() }),
  })

export const GET = app.fetch
export const POST = app.post
