import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { addUser, getUser } from './users'
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
    expect(user).toBe([])
  })
})

describe('addUser', () => {
  it('should add a new user if the user does not exist', async () => {
    const newUser: User = {
      id: 'auth0|666',
      username: 'newUser',
      name: 'Bla blabla',
      email: 'blabla@example.org',
      isAdmin: false,
    }
    const result = await addUser(newUser)
    expect(result).toEqual([7]) // count of rows after insertion
  })

  it('should not add a duplicate user (auth0Id)', async () => {
    const newUser: User = {
      id: 'auth0|001',
      username: 'newUser',
      name: 'Bla blabla',
      email: 'blabla@example.org',
      isAdmin: false,
    }
    await expect(() => addUser(newUser)).rejects.toThrowError(
      /UNIQUE constraint failed: users.id/
    )
  })
})
