import { sql, type Kysely } from 'kysely'

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
    console.log('Creating Meal table...')
    await db.schema
      .createTable('Meal')
      .addColumn('id', 'serial', (col) => col.primaryKey())
      .addColumn('title', 'text', (col) => col.notNull())
      .addColumn('hating', 'varchar', (col) => col.notNull())
      .execute()

    console.log('Creating MealStation type...')
    await db.schema.createType('MealStation').asEnum(['Discovery',
      'Station 1',
      'Station 2',
      'Grill']).execute()

    console.log('Creating MealSloption table...')
    await db.schema.createTable('MealSloption')
      .addColumn('id', 'serial', (col) => col.primaryKey())
      .addColumn('name', 'text', (col) => col.notNull())
      .addColumn('station', sql`public."meal_station"`, (col) => col.notNull())
      .addColumn('mealId', 'integer', (col) => col.references('Meal.id').onDelete('cascade').notNull())
      .execute()

    console.log('Creating meal_sloption_meal_id_index index...')
    await db.schema.createIndex('meal_sloption_meal_id_index').on('MealSloption').column('mealId').execute()

}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropIndex('meal_sloption_meal_id_index').execute()
  await db.schema.dropTable('MealSloption').execute()
  await db.schema.dropType('MealStation').execute()
  await db.schema.dropTable('Meal').execute()
}
