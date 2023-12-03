import request from 'superagent'

const rootUrl = '/api/v1'

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getAdminClients(token: string) {
  const res = await request
    .get(`${rootUrl}/admin/clientlist`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  console.log(res.body)

  return res.body
}

export async function getAdminClientTasks(
  adminId: string,
  clientUsername: string
) {
  const res = await request
    .get(`${rootUrl}/admin/${clientUsername}/tasks`)
    .set('Authorization', `Bearer ${adminId}`)
    .set('Content-Type', 'application/json')
  console.log(res.body)

  return res.body
}

function logError(err: Error) {
  console.log(err)
  if (err.message === 'Username Taken') {
    throw new Error('Username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error(
      'Only the user who added the fruit may update and delete it'
    )
  } else {
    console.error('Error consuming the API (in client/api.js):', err.message)
    throw err
  }
}
