import express from 'express'
import { getTasksByAdmin } from '../db/getTasks'

const router = express.Router()

router.get('/:adminId/:clientId/tasks', async (req, res) => {
  const adminId = req.params.adminId
  const clientId = req.params.clientId
  try {
    const result = await getTasksByAdmin(adminId, clientId)
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
