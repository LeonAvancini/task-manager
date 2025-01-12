import { Request, Response, NextFunction } from 'express'
import { ZodError, z } from 'zod'
import { handleError } from '../utils/handleError'
import { userIdSchema } from '../schemas/userSchema'

export const validateUserId = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = { userId: req.userId }
        userIdSchema.parse(data)

        next()
    } catch (error) {
        if (error instanceof ZodError) {
            handleError(
                res,
                400,
                error.errors.map((err) => err.message).join(', ')
            )
        } else {
            handleError(res, 500, 'Unexpected validation error')
        }
    }
}
