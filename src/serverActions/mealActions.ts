import { createServerFn } from '@tanstack/react-start'
import { db } from '#/db'
import { type Meal, mealSchema } from '#/lib/types/meal'

export const getMeals = createServerFn({ method: 'GET' }).handler(async () => {
  console.log('getMeals')
  return {}
})

export const addMeal = createServerFn({ method: 'POST' })
  .validator((data: Meal) => {
    const formData = mealSchema.safeParse(data)
    if (!formData.success) {
      throw new Error('Invalid meal data')
    }
    return formData.data
  })
  .handler(async ({ data }) => {
    console.log('addMeal ', data)
    try {
      await db.transaction().execute(async (trx) => {
        trx.insertInto('meal').values({
          title: data.title,
          hating: data.hating,
          comment: data.comment,
        })
      })
      return {}
    } catch (error) {
      console.error(error)
      throw new Error('Server error', {
        cause: error instanceof Error ? error.message : String(error),
      })
    }
  })
