export async function seed(knex) {
  await knex('task_options').insert([
    {
      id: 1,
      name: 'Breathing',
      link: '',
    },
    {
      id: 2,
      name: 'Something else',
      link: '',
    },
    {
      id: 3,
      name: 'Another task',
      link: '',
    },
  ])
}
