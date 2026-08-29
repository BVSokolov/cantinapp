import { createServerFn } from '@tanstack/react-start'
import type { Insertable } from 'kysely'
import { db } from '#/db'
import type { Meal } from '#/lib/types/generated/kysely-codegen/db'
import { mealSchema } from '#/lib/types/meal'

export const getMeals = createServerFn({ method: 'GET' }).handler(async () => {
  console.log('getMeals')
  try {
    const meals = await db.selectFrom('meal').selectAll().execute()
    return meals
  } catch (error) {
    console.error(error)
    throw new Error('Server error', {
      cause: error instanceof Error ? error.message : String(error),
    })
  }
})

export const getMeal = createServerFn({ method: 'GET' })
  .validator((params: { mealId: string }) => params)
  .handler(async ({ data }) => {
    const { mealId } = data
    console.log('getMeal', mealId)

    const meal = await db
      .selectFrom('meal')
      .selectAll()
      .where('id', '=', Number(mealId))
      .executeTakeFirstOrThrow()

    // TODO need to get the sloptions as well
    return meal
  })

export const addMeal = createServerFn({ method: 'POST' })
  .validator((data: Insertable<Meal>) => {
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
        const { id: mealId } = await trx
          .insertInto('meal')
          .values({
            title: data.title,
            hating: data.hating,
            comment: data.comment,
          })
          .returning('id')
          .executeTakeFirstOrThrow()

        data.sloptions.forEach(async (sloption) => {
          await trx
            .insertInto('mealSloption')
            .values({
              mealId,
              ...sloption,
            })
            .returning('id')
            .executeTakeFirstOrThrow()
        })
      })
      return { data: 'Success' }
    } catch (error) {
      console.error(error)
      throw new Error('Server error', {
        cause: error instanceof Error ? error.message : String(error),
      })
    }
  })
