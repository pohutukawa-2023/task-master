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

export async function getClientTasks(auth0id: string) {
  const res = await request
    .get(`/api/v1/client/tasks`)
    .set('Authorization', `Bearer ${auth0id}`)
    .set('Content-Type', 'application/json')
  return res.body
}

export async function taskDone(done: boolean, task_id: number, token: string) {
  const res = await request
    .patch(`/api/v1/client/tasks`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ done, task_id })
  return res.body
}
