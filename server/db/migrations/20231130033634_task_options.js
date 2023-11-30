export async function up(knex) {
  await knex.schema.createTable('task_options', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('link')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('task_options')
}
