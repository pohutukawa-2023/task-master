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
    {
      id: 5,
      name: 'Balance Training',
      link: '',
    },
    {
      id: 6,
      name: 'Posture Correction Exercises',
      link: '',
    },
    {
      id: 7,
      name: 'Cardiovascular Activity',
      link: '',
    },
    {
      id: 8,
      name: 'Strength Training',
      link: '',
    },
    {
      id: 9,
      name: 'Mindfulness Practice',
      link: '',
    },
    {
      id: 10,
      name: 'Relaxation Techniques',
      link: '',
    },
    {
      id: 11,
      name: 'Core Strengthening Exercises',
      link: '',
    },
    {
      id: 12,
      name: 'Joint Mobility Exercises',
      link: '',
    },
    {
      id: 13,
      name: 'Walking Routine',
      link: '',
    },
    {
      id: 14,
      name: 'Water Therapy',
      link: '',
    },
  ])
}
