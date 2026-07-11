import { useQuery } from "@tanstack/react-query"
import { API_PREFIX } from "app/api/[[...slugs]]/route"

const queryKeys = {
  getRoot: () => ["/"],
}

const useGetRoot = () => {
  const route = queryKeys.getRoot()
  return useQuery({
    queryKey: route,
    queryFn: async () => {
      const response = await fetch(`${API_PREFIX}${route}`)
      const responseJson = await response.json()
      return responseJson.data
    },
  })
}

export { useGetRoot }
