import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'

import { getAdminClientTasks } from './getTasks'
import { getTasks } from './getTasks'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('getTasks', () => {
  it('should get a clients assigned tasks by their auth0id', async () => {
    const tasks = await getTasks('auth0|6568fbe776c1b421367adca1')
    expect(tasks).toHaveLength(1)
    expect(tasks[0]).toHaveProperty('id')
    expect(tasks[0]).toHaveProperty('name')
  })

  it('when no task is found associated with the auth0id, should return an empty array', async () => {
    const tasks = await getTasks('auth0|050')
    expect(tasks).toHaveLength(0)
  })
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
