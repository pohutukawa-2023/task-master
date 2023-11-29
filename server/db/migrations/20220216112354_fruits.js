export async function up(knex) {
  await knex.schema.createTable('fruits', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('average_grams_each')
    table.string('added_by_user')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('fruits')
}
