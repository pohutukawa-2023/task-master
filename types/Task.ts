import * as z from 'zod'

export const taskDraftSchema = z.object({
  userId: z.string(),
  adminId: z.string(),
  taskOptionId: z.number(),
  data: z.string(),
  isComplete: z.boolean(),
  date: z.coerce.date(),
})

export const taskSchema = taskDraftSchema.extend({
  id: z.number(),
})

export type TaskDraft = z.infer<typeof taskDraftSchema>
export type Task = z.infer<typeof taskSchema>
