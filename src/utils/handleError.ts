import { Response } from 'express'

export const handleError = (
    res: Response,
    statusCode: number,
    message: string,
    error?: any
) => {
    if (error) console.error(`[${new Date().toISOString()}] ${message}`, error)
    res.status(statusCode).json({ message })
}
