import express from 'express'
import { getAdminClientTasks } from '../db/getTasks'

import * as db from '../db/users.ts'
import { validateAccessToken } from '../auth0'
import { logError } from '../logger.ts'
import { taskDraftSchema } from '../../types/Task.ts'
import { insertTask } from '../db/tasks.ts'

const router = express.Router()

// // Get and view all the tasks that have been assigned to a client by an admin by that clients id
// router.get('/:clientId/tasks', validateAccessToken, async (req, res) => {
//   const adminId = req.auth?.payload.sub
//   const clientId = req.params.clientId

//   if (!adminId) {
//     res.status(400).json({ message: 'Please login with your admin Id' })
//     return
//   }

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
    if (!adminClientTasks) {
      return res.status(404).send('Not found')
    } else {
      return res.status(200).json(adminClientTasks)
    }
  } catch (error) {
    logError(error)
    res.status(500).json({ message: 'Unable to retrieve client tasks' })
  }
})

router.post('/:clientId/addTask', validateAccessToken, async (req, res) => {
  const adminId = req.auth?.payload.sub
  const clientId = req.params.clientId

  if (!adminId) {
    return res.status(400).json({ message: 'Missing admin auth' })
  }

  if (!clientId) {
    return res.status(400).json({ message: 'Missing client id' })
  }

  const form = { ...req.body, adminId, userId: clientId }

  if (!form) {
    return res.status(400).json({ message: 'Missing form input' })
  }

  try {
    const formCheck = taskDraftSchema.safeParse(form)

    if (formCheck.success) {
      const task = {
        ...formCheck.data,
        task_option_id: formCheck.data.taskOptionId,
        is_complete: formCheck.data.isComplete,
      }
      const result = await insertTask(task)
      return res.status(201).json(result)
    } else {
      console.error(formCheck.error)
      return res.status(400).json({ message: 'Invalid form' })
    }
  } catch (error) {
    logError(error)
    return res.status(500).send('Something went wrong')
  }
})

export default router
