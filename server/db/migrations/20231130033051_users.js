export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.string('id').primary().index()
    table.string('username').unique()
    table.string('name')
    table.string('email')
    table.boolean('is_admin').defaultTo(false)
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
