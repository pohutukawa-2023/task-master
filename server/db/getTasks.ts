import { Task } from '../../models/task.ts'
import { TaskOptions } from '../../models/taskOption.ts'
import db from './connection.ts'

export async function getTasks(
  auth0id: Task['userId']
): Promise<TaskOptions[]> {
  return db('tasks as t')
    .where('t.user_id', auth0id)
    .join('task_options as o', 't.task_option_id', 'o.id')
    .select('o.id', 'o.name')
}
export async function getTasksByAdmin(
  adminAuth0id: Task['adminId'],
  clientAuth0id: Task['userId']
): Promise<TaskOptions[]> {
  return db('tasks as t')
    .where('t.admin_id', adminAuth0id)
    .where('t.user_id', clientAuth0id)
    .join('task_options as o', 't.task_option_id', 'o.id')
    .select('o.id', 'o.name')
}
