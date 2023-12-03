import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { upsertUser, getUser, getAdminClients } from './users'
import { User } from '../../types/User'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('getUser', () => {
  it('should return a user with the given auth0id', async () => {
    const expected = {
      username: 'bananaClient',
      name: 'Banana Cabana',
      email: 'banana@example.org',
      is_admin: 0,
    }

    const user = await getUser('auth0|001')

    expect(user).toStrictEqual(expected)
  })

  it('should return an empty array when user not found', async () => {
    const user = await getUser('userThatDoesntExist')
    expect(user).toBe(undefined)
  })
})

describe('upsertUser', () => {
  it('should add a new user if the user does not exist', async () => {
    const newUser: User = {
      id: 'auth0|666',
      username: 'newUser',
      name: 'Bla blabla',
      email: 'blabla@example.org',
      isAdmin: false,
    }
    const result = await upsertUser(newUser)
    expect(result.id).toEqual(newUser.id)

    const after = await db('users').select()
    expect(after).toHaveLength(9)
  })

  it('should not add a duplicate user (auth0Id)', async () => {
    const newUser: User = {
      id: 'auth0|001',
      username: 'already',
      name: 'exists',
      email: 'innit@example.org',
      isAdmin: false,
    }
    // await expect(() => upsertUser(newUser)).rejects.toThrowError(
    //   /UNIQUE constraint failed: users.id/
    // )
    await upsertUser(newUser)
    const after = await db('users').select()
    expect(after).toHaveLength(7)
  })
})

// get clients by admin_id
describe('getAdminClients', () => {
  it('should return clients by admin', async () => {
    const clients = await getAdminClients('auth0|6567ec0f1531c5f8eeca7c39')
    expect(clients[0]).toHaveProperty('id')
    expect(clients[0].admin_id).toBe('auth0|6567ec0f1531c5f8eeca7c39')

    expect(clients[0]).toHaveProperty('name')
    expect(clients[0]).toHaveProperty('task_option_id')
  })

  it('should return an empty array when admin has no clients', async () => {
    const clients = await getAdminClients('userThatDoesntExist')
    expect(clients).toStrictEqual([])
  })
})
