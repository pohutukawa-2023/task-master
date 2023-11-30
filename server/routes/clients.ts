import express from 'express'
// import { JwtRequest } from '../auth0.ts'

import * as db from '../db/users.ts'

const router = express.Router()

// GET /api/v1/client
router.get('/:auth0id', async (req, res) => {
  const auth0id = req.params.auth0id

  if (!auth0id) {
    console.error('Bad Request - no id')
    return res.status(400).send('Bad request')
  }

  try {
    const client = await db.getUser(auth0id)
    return res.json({ client })
  } catch (error) {
    console.error(error)
  }
})

export default router
