export async function up(knex) {
  await knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary()
    table
      .string('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable()
    table
      .string('admin_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable()
    table
      .integer('task_option_id')
      .unsigned()
      .references('id')
      .inTable('task_options')
      .notNullable()
    table.string('data')
    table.boolean('is_complete').defaultTo(false)
    table.string('date')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('tasks')
}
