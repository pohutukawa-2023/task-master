import { Task } from './Task'
import { TaskOptions } from './TaskOptions'
import { User } from './User'

export type AdminClientTask = Task & User & TaskOptions
