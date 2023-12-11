import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import server from '../server'
import { getTasksByAdmin } from '../db/getTasks'

import { getMockToken } from './mockToken'
import { TaskDraft } from '../../types/Task'
import { insertTask } from '../db/tasks'

vi.mock('../db/tasks')
vi.mock('../db/getTasks.ts')

describe('POST /api/v1/admin/:clientId/addTask', () => {
  it('adding a new task should return 201', async () => {
    const newTask: TaskDraft = {
      userId: 'auth0|001',
      adminId: 'auth0|999',
      taskOptionId: 1,
      data: '',
      isComplete: false,
      date: new Date(),
    }
    vi.mocked(insertTask).mockResolvedValue({ id: 99, ...newTask })
    const response = await request(server)
      .post(`/api/v1/admin/${newTask.userId}/addTask`)
      .send(newTask)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(201)
    expect(response.body.id).toEqual(99)
  })

  it('returns 401 if not authenticated', async () => {
    const newTask: TaskDraft = {
      userId: 'auth0|001',
      adminId: 'auth0|999',
      taskOptionId: 1,
      data: '',
      isComplete: false,
      date: new Date(),
    }
    const response = await request(server)
      .post(`/api/v1/admin/${newTask.userId}/addTask`)
      .send(newTask)
    expect(response.status).toBe(401)
    expect(response.error).toEqual(
      Error('cannot POST /api/v1/admin/auth0%7C001/addTask (401)')
    )
  })

  it('returns 400 if invalid user data sent', async () => {
    const newTask = {
      userId: 'auth0|001',
    }
    const response = await request(server)
      .post(`/api/v1/admin/${newTask.userId}/addTask`)
      .send(newTask)
      .set('authorization', `Bearer ${getMockToken()}`)

    expect(response.status).toBe(400)
    expect(response.error).toEqual(
      Error('cannot POST /api/v1/admin/auth0%7C001/addTask (400)')
    )
  })

  it('returns 500 if addUser fails', async () => {
    const newTask: TaskDraft = {
      userId: 'auth0|001',
      adminId: 'auth0|999',
      taskOptionId: 1,
      data: '',
      isComplete: false,
      date: new Date(),
    }
    vi.mocked(insertTask).mockRejectedValue('')
    const response = await request(server)
      .post(`/api/v1/admin/${newTask.userId}/addTask`)
      .send(newTask)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.error).toEqual(
      Error('cannot POST /api/v1/admin/auth0%7C001/addTask (500)')
    )
  })
})

describe('GET /api/v1/admin/:clientId/tasks', () => {
  it('should return 401 status if the request fails', async () => {
    const client = 'auth0|001'
    const response = await request(server).get(`/api/v1/admin/${client}/tasks`)
    expect(response.status).toBe(401)
  })
})
