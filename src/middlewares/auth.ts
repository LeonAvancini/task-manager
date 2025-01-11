import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/jwt'
import { UserPayload } from '../types/express'

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized: No token provided' })
        return
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = verifyToken(token)

        req.user = decoded as UserPayload

        next()
    } catch (error) {
        console.error('JWT verification failed:', error)

        res.status(401).json({
            message: 'Unauthorized: Invalid or expired token',
        })
        return
    }
}
