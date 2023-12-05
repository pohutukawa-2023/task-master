import { Task } from '../../models/task.ts'
import { TaskOptions } from '../../models/taskOption.ts'
import { AdminClientTask } from '../../types/Admin.ts'
import db from './connection.ts'

export async function taskComplete(done: boolean, task_id: number) {
  return db('tasks').where('id', task_id).update('is_complete', done)
}
