import { z } from 'zod'

export const getTasksSchema = z.object({
    userId: z.number().positive('Invalid user ID'),
})

export const createTaskSchema = z.object({
    userId: z.number().positive('Invalid user id'),
    name: z.string().min(1, 'Task name is required'),
    description: z.string().optional(),
})

export const taskIdentifierSchema = z.object({
    taskId: z
        .string()
        .regex(/^\d+$/, 'Task ID must be a valid number')
        .transform(Number),
    userId: z.number().positive('Invalid user id'),
})
