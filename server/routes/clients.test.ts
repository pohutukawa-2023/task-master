import { vi, describe, it, expect } from 'vitest'
import request from 'supertest'
import server from '../server'
import * as db from '../db/users'

vi.mock('../db/users')

describe('GET /api/v1/client/:auth0id', () => {
  it('should return 200 with a user in an array', async () => {
    const testClient = [
      {
        id: 'auth0|001',
        username: 'testBanana',
        name: 'Banana Testana',
        email: 'test_banana@example.org',
        isAdmin: false,
      },
    ]

    vi.mocked(db.getUser).mockResolvedValue(testClient)
    const response = await request(server).get('/api/v1/client/auth0|001')
    // .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(testClient)
  })

  it('should return 404 if the users not found', async () => {
    vi.mocked(db.getUser).mockResolvedValue([])
    const response = await request(server).get('/api/v1/client/auth0|001')
    // .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(404)
    expect(response.text).toEqual('Not found')
  })

  it('should return 500 if the promise is rejected', async () => {
    vi.mocked(db.getUser).mockRejectedValue(new Error())
    const response = await request(server).get('/api/v1/client/auth0|001')
    // .set('authorization', `Bearer ${getMockToken()}`)
    expect(response.status).toBe(500)
    expect(response.text).toEqual('Something went wrong')
  })
})
