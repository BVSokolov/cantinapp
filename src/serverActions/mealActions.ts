import { createServerFn } from '@tanstack/react-start'
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
      return {}
    } catch (error) {
      throw new Error('Server error', { cause: error })
    }
  })
