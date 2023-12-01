import * as z from 'zod'

export const userDraftSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string(),
})

export const userSchema = userDraftSchema.extend({
  id: z.string(),
  isAdmin: z.boolean(),
})

export type UserDraft = z.infer<typeof userDraftSchema>
export type User = z.infer<typeof userSchema>
