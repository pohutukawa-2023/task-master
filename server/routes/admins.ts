import express from 'express'
import { getTasksByAdmin, getAdminClientTasks } from '../db/getTasks'

import * as db from '../db/users.ts'
import { validateAccessToken } from '../auth0'
import { logError } from '../logger.ts'

const router = express.Router()

// router.get('/:clientId/tasks', validateAccessToken, async (req, res) => {
//   const adminId = req.auth?.payload.sub
//   const clientId = req.params.clientId

//   try {
//     const result = await getTasksByAdmin(adminId as string, clientId)
//     if (!result) {
//       return res.status(404).send('Not found')
//     } else {
//       return res.json(result)
//     }
//   } catch (error) {
//     logError(error)
//     return res.status(500).send('Something went wrong')
//   }
// })
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

// GET /api/v1/admin/:clientUsername/tasks
router.get('/:clientUsername/tasks', validateAccessToken, async (req, res) => {
  const adminId = req.auth?.payload.sub
  const clientUsername = req.params.clientUsername

  if (!adminId) {
    res.status(400).json({ message: 'Please login with your admin Id' })
    return
  }

  try {
    const adminClientTasks = await getAdminClientTasks(adminId, clientUsername)
    res.status(200).json(adminClientTasks)
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to retrieve client tasks' })
  }
})

export default router
