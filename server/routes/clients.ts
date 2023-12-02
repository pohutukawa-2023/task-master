import express from 'express'

import { getUser, upsertUser } from '../db/users.ts'
import { getTasks } from '../db/getTasks.ts'
import { validateAccessToken } from '../auth0'
import { userDraftSchema } from '../../types/User.ts'
import { logError } from '../logger.ts'

const router = express.Router()

// GET /api/v1/client
router.get('/', validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub

  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const result = await getUser(auth0Id)

    if (!result) {
      return res.status(404).send('Not found')
    } else {
      return res.json(result)
    }
  } catch (error) {
    logError(error)
    return res.status(500).send('Something went wrong')
  }
})

router.get('/:auth0id/tasks', async (req, res) => {
  const auth0id = req.params.auth0id

  try {
    const result = await getTasks(auth0id)
    if (!auth0id) {
      res.status(404).send('Not found')
    } else {
      return res.json(result)
    }
  } catch (error) {
    logError(error)
    return res.status(500).send('Something went wrong')
  }
})

// POST /api/v1/client
// uses the logged in users token,
router.post('/edit', validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub
  const form = req.body

  if (!auth0Id) {
    return res.status(400).json({ message: 'Missing auth0 id' })
  }

  if (!form) {
    return res.status(400).json({ message: 'Please provide a form' })
  }

  try {
    const userResult = userDraftSchema.safeParse(form)

    if (!userResult.success) {
      return res.status(400).json({ message: 'Invalid form' })
    }

    if (userResult.success) {
      const user = { ...userResult.data, id: auth0Id, isAdmin: false }
      const result = await upsertUser(user)
      return res.status(201).send(result)
    }
  } catch (error) {
    logError(error)
    return res.status(500).send('Something went wrong')
  }
})

export default router
