export async function seed(knex) {
  await knex('users').insert([
    {
      id: 'auth0|001',
      username: 'banana',
      name: 'Banana Cabana',
      email: 'banana@example.org',
      is_admin: false,
    },
    {
      id: 'auth0|002',
      username: 'apple',
      name: 'Apple Berapple',
      email: 'apple@example.org',
      is_admin: true,
    },
    {
      id: 'auth0|999',
      username: 'physio',
      name: 'Physio Therapist',
      email: 'physio@example.org',
      is_admin: true,
    },
  ])
}
