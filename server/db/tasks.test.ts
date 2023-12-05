import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import db from './connection'
import { Task, TaskDraft } from '../../types/Task'
import { insertTask } from './tasks'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('insertTask', () => {
  it('should add a new task if the task does not exist', async () => {
    const newTask: TaskDraft = {
      userId: 'auth0|001',
      adminId: 'auth0|999',
      taskOptionId: 1,
      data: 'bla',
      isComplete: false,
      date: new Date(),
    }
    const result = await insertTask(newTask)
    expect(result.id).toEqual(24)
    expect(result.userId).toEqual('auth0|001')
    expect(result.adminId).toEqual('auth0|999')
  })
})
