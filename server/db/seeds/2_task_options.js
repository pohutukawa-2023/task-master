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
    {
      id: 4,
      name: 'Balance Training',
      link: '',
    },
    {
      id: 5,
      name: 'Posture Correction Exercises',
      link: '',
    },
    {
      id: 6,
      name: 'Cardiovascular Activity',
      link: '',
    },
    {
      id: 7,
      name: 'Strength Training',
      link: '',
    },
    {
      id: 8,
      name: 'Mindfulness Practice',
      link: '',
    },
    {
      id: 9,
      name: 'Relaxation Techniques',
      link: '',
    },
    {
      id: 10,
      name: 'Core Strengthening Exercises',
      link: '',
    },
    {
      id: 11,
      name: 'Joint Mobility Exercises',
      link: '',
    },
    {
      id: 12,
      name: 'Walking Routine',
      link: '',
    },
    {
      id: 13,
      name: 'Water Therapy',
      link: '',
    },
  ])
}
