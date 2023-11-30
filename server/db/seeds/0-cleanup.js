export async function seed(knex) {
  await knex('users').del()
  await knex('task_options').del()
  await knex('tasks').del()
}
