import { User } from '../../types/User.ts'
import db from './connection.ts'

export async function getUser(id: User['id']): Promise<User[]> {
  return db('users')
    .select('username', 'name', 'email', 'is_admin')
    .where('id', id)
    .first()
}

export async function getAdminClients(authId: string) {
  try {
    return await db('tasks')
      .join('users', 'tasks.user_id', 'users.id')
      .select()
      .where('tasks.admin_id', authId)
  } catch (error) {
    return Promise.reject(new Error(error as string))
  }
}

export async function upsertUser(newUser: User) {
  try {
    const result = await db('users')
      .insert({
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        is_admin: newUser.isAdmin,
      })
      .returning('*')
      .onConflict('id')
      .merge()
    return result[0]
  } catch (error) {
    return Promise.reject(new Error(error as string))
  }
}
