export async function seed(knex) {
  await knex('tasks').insert([
    {
      id: 1,
      user_id: 'auth0|001',
      admin_id: 'auth0|999',
      task_option_id: 1,
      date: '2023-12-01',
    },
    {
      id: 2,
      user_id: 'auth0|001',
      admin_id: 'auth0|999',
      task_option_id: 2,
      date: '2023-12-01',
    },
    {
      id: 3,
      user_id: 'auth0|001',
      admin_id: 'auth0|999',
      task_option_id: 3,
      date: '2023-12-01',
    },
    {
      id: 4,
      user_id: 'auth0|002',
      admin_id: 'auth0|999',
      task_option_id: 1,
      date: '2023-12-01',
    },
    {
      id: 5,
      user_id: 'auth0|002',
      admin_id: 'auth0|999',
      task_option_id: 2,
      date: '2023-12-01',
    },
    {
      id: 6,
      user_id: 'auth0|002',
      admin_id: 'auth0|999',
      task_option_id: 1,
      date: '2023-12-02',
    },
    {
      id: 7,
      user_id: 'auth0|002',
      admin_id: 'auth0|6567ec0f1531c5f8eeca7c39',
      task_option_id: 2,
      date: '2023-12-02',
    },
  ])
}
