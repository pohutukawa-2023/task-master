export async function seed(knex) {
  await knex('users').insert([
    {
      id: 1,
      username: 'banana',
      name: 'Banana Cabana',
      email: 'auth0|123',
      is_admin: false,
    },
    {
      id: 2,
      username: 'apple',
      name: 'Apple Berapple',
      email: 'auth0|456',
      is_admin: true,
    },
    {
      id: 3,
      username: 'physio',
      name: 'Physio Therapist',
      email: 'auth0|012',
      is_admin: true,
    },
  ])
}
