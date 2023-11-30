export async function seed(knex) {
  await knex('tasks').insert([
    {
      id: 1,
      user_id: 1,
      admin_id: 3,
      task_option_id: 1,
      date: '2023-12-01',
    },
    {
      id: 2,
      user_id: 1,
      admin_id: 3,
      task_option_id: 2,
      date: '2023-12-01',
    },
    {
      id: 3,
      user_id: 1,
      admin_id: 3,
      task_option_id: 3,
      date: '2023-12-01',
    },
    {
      id: 4,
      user_id: 2,
      admin_id: 3,
      task_option_id: 1,
      date: '2023-12-01',
    },
    {
      id: 5,
      user_id: 2,
      admin_id: 3,
      task_option_id: 2,
      date: '2023-12-01',
    },
    {
      id: 6,
      user_id: 2,
      admin_id: 3,
      task_option_id: 1,
      date: '2023-12-02',
    },
  ])
}
