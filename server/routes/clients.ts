import express from 'express'

import * as db from '../db/users.ts'
import { validateAccessToken } from '../auth0'

const router = express.Router()

// GET /api/v1/client
router.get('/:auth0id', validateAccessToken, async (req, res) => {
  const auth0id = req.params.auth0id

  try {
    const result = await db.getUser(auth0id)
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
