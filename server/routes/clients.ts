import express from 'express'
// import { JwtRequest } from '../auth0.ts'

import { getUser } from '../db/users.ts'
import { getTasks } from '../db/getTasks.ts'

const router = express.Router()

// GET /api/v1/client
router.get('/:auth0id', async (req, res) => {
  const auth0id = req.params.auth0id

  try {
    const result = await getUser(auth0id)
    if (result.length === 0) {
      return res.status(404).send('Not found')
    } else {
      return res.json(result)
    }
  } catch (error) {
    console.error(error)
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
    console.error(error)
    return res.status(500).send('Something went wrong')
  }
})

export default router
