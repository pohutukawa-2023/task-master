import { Task, TaskDraft } from '../../types/Task.ts'
import db from './connection.ts'

export async function insertTask(task: TaskDraft): Promise<Task> {
  try {
    const result = await db('tasks')
      .insert({
        user_id: task.userId,
        admin_id: task.adminId,
        task_option_id: task.taskOptionId,
        data: task.data,
        is_complete: task.isComplete,
        date: task.date,
      })
      .returning([
        'id',
        'user_id as userId',
        'admin_id as adminId',
        'task_option_id as taskOptionId',
        'data',
        'is_complete as isComplete',
        'date',
      ])
    return result[0]
  } catch (error) {
    return Promise.reject(new Error(error as string))
  }
}

// Delete task from admin side
export async function deleteTask(id: number, adminId: string): Promise<Task> {
  try {
    return db('tasks').where('id', id).where('adminId', adminId).del()
  } catch (error) {
    return Promise.reject(new Error(error as string))
  }
}
