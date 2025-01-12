import { z } from 'zod'

export const userIdSchema = z.object({
    userId: z.number().positive('Invalid user ID'),
})
