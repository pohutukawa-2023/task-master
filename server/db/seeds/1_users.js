export async function seed(knex) {
  await knex('users').insert([
    {
      id: 'auth0|001',
      username: 'bananaClient',
      name: 'Banana Cabana',
      email: 'banana@example.org',
      is_admin: false,
    },
    {
      id: 'auth0|002',
      username: 'appleClient',
      name: 'Apple Berapple',
      email: 'apple@example.org',
      is_admin: false,
    },
    {
      id: 'auth0|999',
      username: 'physio',
      name: 'Physio Therapist',
      email: 'physio@example.org',
      is_admin: true,
    },
    {
      id: 'auth0|656ba3141d577edc5228f00e',
      username: 'DaveClient',
      name: 'Dave NeedsPhysio',
      email: 'dave@example.org',
      is_admin: false,
    },
    {
      id: 'auth0|6567ec0f1531c5f8eeca7c39',
      username: 'pathik@example.com',
      name: 'Pathik Therapist',
      email: 'pathik@example.com',
      is_admin: true,
    },
    {
      id: 'auth0|65694bb101091573c2085f70',
      username: 'kirkpatrickxavier@example.com',
      name: 'Xavier Kirkpatrick',
      email: 'kirkpatrickxavier@example.com',
      is_admin: true,
    },
    {
      id: 'auth0|656ba4f101f9e8a19d2c8d19',
      username: 'kirsty@example.com',
      name: 'Kirsty Ammundsen',
      email: 'kirsty@example.com',
      is_admin: false,
    },
    {
      id: 'auth0|656bbeec76c1b421367bd2eb',
      username: 'physioDave',
      name: 'Dave Physio',
      email: 'physiodave@example.com',
      is_admin: true,
    },
  ])
}
