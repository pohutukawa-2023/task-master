export interface TaskSnakeCase {
  id?: number
  user_id: string
  admin_id: string
  task_option_id: number
  data: string
  is_complete: boolean
  date: Date
}

export interface Task {
  id?: number
  userId: string
  adminId: string
  taskOptionId: number
  data: string
  isComplete: boolean
  date: Date
}

export interface TaskData {
  userId: string
  adminId: string
  taskOptionId: number
  data: string
  isComplete: boolean
  date: Date
}
