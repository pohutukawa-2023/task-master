import request from 'superagent'
import { UserDraft } from '../../types/User'

export async function getClient(token: string) {
  const res = await request
    .get('/api/v1/client/')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body
}

export async function upsertClient(token: string, user: UserDraft) {
  const res = await request
    .post('/api/v1/client/edit')
    .send(user)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body
}

export async function getClientStats(token: string, clientId: string) {
  const res = await request
    .get(`/api/v1/client/stats/${clientId}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
  console.log(res.body)

  return res.body
}
