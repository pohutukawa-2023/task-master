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
    expect(user).toBe([])
  })
})
