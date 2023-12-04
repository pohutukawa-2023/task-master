import * as z from 'zod'

export const taskDataSchema = z.object({
  taskOptionId: z.number(),
  data: z.string(),
  isComplete: z.boolean(),
  date: z.string(),
})

export const taskDraftSchema = taskDataSchema.extend({
  userId: z.string(),
  adminId: z.string(),
})

export const taskSchema = taskDraftSchema.extend({
  id: z.number(),
})

export type TaskData = z.infer<typeof taskDataSchema>
export type TaskDraft = z.infer<typeof taskDraftSchema>
export type Task = z.infer<typeof taskSchema>
