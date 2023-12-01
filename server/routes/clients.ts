import express from 'express'

import * as db from '../db/users.ts'
import { validateAccessToken } from '../auth0'

const router = express.Router()

// GET /api/v1/client
router.get('/', validateAccessToken, async (req, res) => {
  const auth0Id = req.auth?.payload.sub

  if (!auth0Id) {
    res.status(400).json({ message: 'Please provide an id' })
    return
  }

  try {
    const result = await db.getUser(auth0Id)
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

export default router
