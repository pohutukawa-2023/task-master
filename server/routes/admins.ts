import express from 'express'
import { getTasksByAdmin } from '../db/getTasks'

import * as db from '../db/users.ts'
import { validateAccessToken } from '../auth0'
import { logError } from '../logger.ts'

const router = express.Router()

// Get and view all the tasks that have been assigned to a client by an admin by that clients id
router.get('/:clientId/tasks', validateAccessToken, async (req, res) => {
  const adminId = req.auth?.payload.sub
  const clientId = req.params.clientId
  if (!adminId) {
    res.status(400).json({ message: 'Please login with your admin Id' })
    return
  }

  try {
    const result = await getTasksByAdmin(adminId as string, clientId)
    // console.log(result)
    if (result.length === 0) {
      return res.status(404).send('Not found')
    } else {
      return res.json(result)
    }
  } catch (error) {
    logError(error)
    return res.status(500).send('Something went wrong')
  }
})

// Get all clients that have been assigned to that admin.
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
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to retrieve clients' })
  }
})

export default router
