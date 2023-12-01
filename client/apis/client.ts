import request from 'superagent'

export async function getClient(token: string) {
  const res = await request
    .get('/api/v1/client/')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body
}
