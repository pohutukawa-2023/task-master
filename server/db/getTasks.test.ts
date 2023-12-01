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
  it.skip('is skipped because theres not test', async () => {})
})
