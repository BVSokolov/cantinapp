import { type Kysely } from 'kysely'

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  console.log('Adding createdBy column to Meal table...')
  await db.schema
    .alterTable('meal')
    .addColumn('created_by', 'uuid', (col) =>
      col
        .references('neon_auth.user.id')
        .onDelete('cascade')
        .onUpdate('cascade')
        .notNull(),
    )
    .execute()

  console.log('Creating index on Meal createdBy column...')
  await db.schema
    .createIndex('meal_created_by_index')
    .on('meal')
    .column('created_by')
    .execute()
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  console.log('Removing createdBy index and column from Meal table...')
  await db.schema.dropIndex('meal_created_by_index').execute()
  await db.schema.alterTable('Meal').dropColumn('createdBy').execute()
}
