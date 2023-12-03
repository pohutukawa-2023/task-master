import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import server from '../server'


import { getMockToken } from './mockToken'
import { TaskDraft } from '../../types/Task'
import { insertTask } from '../db/tasks'

import { getTasksByAdmin } from '../db/getTasks'

import { getMockToken } from './mockToken'

vi.mock('../db/getTasks')

describe('GET /api/v1/admin/:clientId/tasks', () => {
  it('should return 200 with a clients assigned tasks', async () => {
    const testTask = [
      {
        id: 1,
        name: 'Breathing',
        link: '',
      },
    ]
    vi.mocked(getTasksByAdmin).mockResolvedValue(testTask)
    const client = 'auth0|001'
    const response = await request(server)
      .get(`/api/v1/admin/${client}/tasks`)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(testTask)
  })

  it('should return 404 if the tasks not found', async () => {
    const client = 'auth0|001'
    vi.mocked(getTasksByAdmin).mockResolvedValue([])
    const response = await request(server)
      .get(`/api/v1/admin/${client}/tasks`)
      .set('authorization', `Bearer ${getMockToken()}`)
    // expect(response.status).toBe(404)
    expect(response.text).toEqual('Not found')
  })
  it('should return 500 status if the request fails', async () => {
    const client = 'auth0|001'
    vi.mocked(getTasksByAdmin).mockRejectedValue('')
    const response = await request(server)
      .get(`/api/v1/admin/${client}/tasks`)
      .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.text).toEqual('Something went wrong')
  })
  it('should return 401 if not authenticated', async () => {
    const testTask = [
      {
        id: 1,
        name: 'Breathing',
        link: '',
      },
    ]
    vi.mocked(getTasksByAdmin).mockResolvedValue(testTask)
    const client = 'auth0|001'
    const response = await request(server).get(`/api/v1/admin/${client}/tasks`)
    expect(response.status).toBe(401)


vi.mock('../db/tasks')

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
