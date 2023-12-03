import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { getUser } from './users'
import { getAdminClientTasks } from './getTasks'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('getUser', () => {
  it.skip('is skipped because theres not test', async () => {})
})

// testing to show tasks for a client by admin_id
describe('getAdminClientTasks', () => {
  it('should return tasks filtering for adminId and clientId', async () => {
    const tasks = await getAdminClientTasks(
      'auth0|6567ec0f1531c5f8eeca7c39',
      'appleClient'
    )
    expect(tasks[0].adminId).toBe('auth0|6567ec0f1531c5f8eeca7c39')
    expect(tasks[0]).toHaveProperty('id')
    expect(tasks[0]).toHaveProperty('clientId')
    expect(tasks[0]).toHaveProperty('taskId')
  })

  it('should return an empty array when user not found', async () => {
    const user = await getAdminClientTasks('userThatDoesntExist', 'fakeClient')
    expect(user).toStrictEqual([])
  })
})
