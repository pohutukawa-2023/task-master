import express from 'express'
import { getTasksByAdmin } from '../db/getTasks'
import { validateAccessToken } from '../auth0'

const router = express.Router()

router.get('/:clientId/tasks', validateAccessToken, async (req, res) => {
  const adminId = req.auth?.payload.sub
  const clientId = req.params.clientId
  try {
    const result = await getTasksByAdmin(adminId as string, clientId)
    if (!result) {
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
