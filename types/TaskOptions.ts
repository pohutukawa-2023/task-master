import * as z from 'zod'

export const taskOptionsSchema = z.object({
  taskName: z.string(),
  link: z.string(),
})

export type TaskOptions = z.infer<typeof taskOptionsSchema>
