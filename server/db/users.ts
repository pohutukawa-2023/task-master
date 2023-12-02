import { User } from '../../models/user.ts'
import db from './connection.ts'

export async function getUser(id: User['id']): Promise<User[]> {
  return db('users')
    .select('username', 'name', 'email', 'is_admin')
    .where('id', id)
    .first()
}

export async function getAdminClients(authId: string) {
  return await db('tasks')
    .join('users', 'tasks.user_id', 'users.id')
    .select()
    .where('tasks.admin_id', authId)
}
