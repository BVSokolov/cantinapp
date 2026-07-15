import { cors } from "@elysia/cors"
import { Elysia, status, t } from "elysia"
import { signUpWithEmail } from "@/app/lib/actions/auth"
import { verifyToken } from "@/auth"

export const API_PREFIX = "/api/v1"

const authPlugin = new Elysia({ name: "neon-auth" }).macro({
  auth: {
    async resolve({ status, headers }) {
      const token = headers.authorization?.replace("Bearer ", "")
      if (!token) return status(401)

      try {
        const payload = await verifyToken(token)
        return { userId: payload.sub as string }
      } catch (error: unknown) {
        console.error(error)
        return status(401)
      }
    },
  },
})

const app = new Elysia({ prefix: API_PREFIX })
  .use(
    cors({
      origin: "http://localhost:3000", // TODO change this to use env variable,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .use(authPlugin)
  .get("/", { data: "Hello Nextjs" })
  .post(
    "/auth/sign-up",
    async ({ body }) => {
      console.log("body is ", body)
      const result = await signUpWithEmail(body)
      if (result.error) {
        return status(500, result.error)
      }
      return status(200, { data: result.data })
    },
    {
      body: t.Object({
        userName: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    },
  )
  .get(
    "/auth/test",
    ({ userId }) => {
      console.log("got user id ", userId)
    },
    { auth: true },
  )

export const GET = app.fetch
export const POST = app.fetch
export type App = typeof app
