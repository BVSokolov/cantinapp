import { treaty } from "@elysia/eden/treaty2"
import { useQuery } from "@tanstack/react-query"
import type { App } from "@/app/api/[[...slugs]]/route"
import { API_PREFIX } from "@/app/api/[[...slugs]]/route"

const queryKeys = {
  getRoot: () => [API_PREFIX, "/"],
}

const client = treaty<App>("localhost:3000") // TODO change to use env var

const useGetRoot = () => {
  const route = queryKeys.getRoot()
  return useQuery({
    queryKey: route,
    queryFn: async () => {
      const { status, data } = await client.api.v1.get()
      if (status !== 200 || !data) return "something went wrong :\\"
      return data.data
    },
  })
}

export { useGetRoot }
