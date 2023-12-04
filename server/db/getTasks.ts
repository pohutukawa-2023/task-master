import { Task } from '../../models/task.ts'
import { TaskOptions } from '../../models/taskOption.ts'
import { AdminClientTask } from '../../types/Admin.ts'
import db from './connection.ts'

export async function getTasks(
  auth0id: Task['userId']
): Promise<TaskOptions[]> {
  return db('tasks as t')
    .where('t.user_id', auth0id)
    .join('task_options as o', 't.task_option_id', 'o.id')
    .select(
      't.id',
      'is_complete as isComplete',
      'o.id as option_id',
      'o.name',
      'date'
    )
}
// export async function getTasksByAdmin(
//   adminAuth0id: Task['adminId'],
//   clientAuth0id: Task['userId']
// ): Promise<TaskOptions[]> {
//   return db('tasks as t')
//     .where('t.admin_id', adminAuth0id)
//     .where('t.user_id', clientAuth0id)
//     .join('task_options as o', 't.task_option_id', 'o.id')
//     .select('o.id', 'o.name')
// }

export async function getAdminClientTasks(
  adminId: string,
  clientUsername: string
): Promise<AdminClientTask[]> {
  return await db('tasks')
    .join('users', 'tasks.user_id', 'users.id')
    .join('task_options', 'task_options.id', 'tasks.task_option_id')
    .where('tasks.admin_id', adminId)
    .where('users.username', clientUsername)
    .select(
      'tasks.id as id',
      'tasks.user_id as clientId',
      'tasks.admin_id as adminId',
      'tasks.task_option_id as taskId',
      'tasks.data as data',
      'tasks.is_complete as isComplete',
      'tasks.date as date',
      'users.username as clientUsername',
      'users.name as clientName',
      'users.email as clientEmail',
      'task_options.name as taskName'
    )
}
