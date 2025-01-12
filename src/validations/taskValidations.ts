import { Request, Response, NextFunction } from 'express'
import {
    createTaskSchema,
    getTasksSchema,
    taskIdentifierSchema,
} from '../schemas/taskSchema'
import { ZodError } from 'zod'
import { handleError } from '../utils/handleError'

export const validateGetTasks = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = { userId: req.userId }
        getTasksSchema.parse(data)

        next()
    } catch (error) {
        if (error instanceof ZodError) {
            handleError(res, 400, error.errors[0].message)
        } else {
            handleError(res, 500, 'Unexpected validation error')
        }
    }
}

export const validateCreateTask = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = {
            userId: req.userId,
            ...req.body,
        }

        req.body = createTaskSchema.parse(data)
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            handleError(res, 400, error.errors[0].message)
        } else {
            handleError(res, 500, 'Unexpected validation error')
        }
    }
}

export const validateTaskIdentifier = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = {
            userId: req.userId,
            taskId: req.params.id,
        }

        const validatedData = taskIdentifierSchema.parse(data)
        req.body = { ...req.body, ...validatedData }

        next()
    } catch (error) {
        if (error instanceof ZodError) {
            handleError(res, 400, error.errors[0].message)
        } else {
            handleError(res, 500, 'Unexpected validation error')
        }
    }
}
