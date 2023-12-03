export async function seed(knex) {
  await knex('task_options').insert([
    {
      id: 1,
      name: 'Power Breathing',
      link: '',
    },
    {
      id: 2,
      name: 'Yoga',
      link: '',
    },
    {
      id: 3,
      name: 'Walking',
      link: '',
    },
    {
      id: 4,
      name: 'Box Breathing',
      link: '',
    },
  ])
}
