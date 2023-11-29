export async function seed(knex) {
  await knex('fruits').del()
}
