import { createFileRoute } from '@tanstack/react-router'
import { getMeal } from '#/serverActions/mealActions'

export const Route = createFileRoute('/meal/$mealId')({
  loader: async ({ params }) => {
    return await getMeal({ data: params })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { mealId } = Route.useParams()
  const meal = Route.useLoaderData()
  console.log(meal)
  return (
    <div>
      Hello {mealId}!<p>{JSON.stringify(meal)}</p>
    </div>
  )
}
