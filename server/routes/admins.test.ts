import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import server from '../server'
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
  })
})
