import express from 'express'

import * as db from '../db/users.ts'
import { validateAccessToken } from '../auth0'

const router = express.Router()

// GET /api/v1/admin
router.get('/clientlist', validateAccessToken, async (req, res) => {
  const auth0id = req.auth?.payload.sub

  if (!auth0id) {
    res.status(400).json({ message: 'Please login with your admin Id' })
    return
  }

  try {
    const clients = await db.getAdminClients(auth0id)
    res.status(200).json(clients)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Unable to retrieve clients' })
  }
})

export default router
