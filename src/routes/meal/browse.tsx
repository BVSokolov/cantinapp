import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from '#/components/ui/item'
import { HATING_SYMBOLS } from '#/lib/constants'
import { getMeals } from '#/serverActions/mealActions'

export const Route = createFileRoute('/meal/browse')({
  component: RouteComponent,
  loader: async () => {
    return getMeals()
  },
})

function RouteComponent() {
  const meals = Route.useLoaderData()
  const navigate = useNavigate()

  return (
    <div>
      <section className="demo-panel flex w-full max-w-xl flex-col gap-6">
        <div>
          <p className="island-kicker mb-2">Meals</p>
          <p className="demo-muted mt-2">
            Browse what other people have shared
          </p>
        </div>
        <ItemGroup className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {meals.map((meal) => (
            <Item
              key={meal.id}
              variant="muted"
              onClick={() => navigate({ to: `/meal/${meal.id}` })}
            >
              <ItemHeader className="self-baseline">
                <img
                  src=""
                  alt={`${meal.title} image`}
                  width={128}
                  height={128}
                  className="aspect-square w-full rounded-sm object-cover bg-[var(--chip-bg)]"
                />
              </ItemHeader>
              {/*fix the height, it's not correct*/}
              <ItemContent className="self-baseline h-full">
                <ItemTitle>{meal.title}</ItemTitle>
                <ItemDescription>{meal.comment}</ItemDescription>
                <ItemDescription>
                  {HATING_SYMBOLS[Number(meal.hating) - 1]}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </section>
    </div>
  )
}
