import { z } from 'zod'
import { MealStation } from './generated/kysely-codegen/db'

export { MealStation as MealStationEnum }

export const mealSlopStationSchema = z.enum(MealStation)

export const mealSloptionSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  station: mealSlopStationSchema,
})

export const mealSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  // photo,
  hating: z.string().regex(/^['1', '2', '3', '4', '5']+$/),
  sloptions: z.array(mealSloptionSchema).min(1),
  comment: z.string().min(0),
})

// export type Meal = z.infer<typeof mealSchema>
