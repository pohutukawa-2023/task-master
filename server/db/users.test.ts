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
    const friends = await getUser('auth0|001')
    expect(friends).toHaveLength(1)
    expect(friends[0]).toHaveProperty('username')
    expect(friends[0]).toHaveProperty('name')
    expect(friends[0]).toHaveProperty('email')
    expect(friends[0]).toHaveProperty('is_admin')
  })
})
