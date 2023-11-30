import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { getUser } from './users'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('getUser', () => {
  it('should return a user with the given auth0id', async () => {
    const user = await getUser('auth0|001')
    expect(user).toHaveLength(1)
    expect(user[0]).toHaveProperty('username')
    expect(user[0]).toHaveProperty('name')
    expect(user[0]).toHaveProperty('email')
    expect(user[0]).toHaveProperty('is_admin')
  })

  it('should return an empty array when user not found', async () => {
    const user = await getUser('userThatDoesntExist')
    expect(user).toHaveLength(0)
  })
})
