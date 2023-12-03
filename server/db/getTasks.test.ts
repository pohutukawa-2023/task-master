import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { getTasks } from './getTasks'
// import { getUser } from './users'

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
