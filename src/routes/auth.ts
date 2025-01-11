import { Request, Router, Response } from 'express'
import bcrypt from 'bcrypt'
import validator from 'validator'
import prisma from '../db/prisma'
import { generateToken } from '../utils/jwt'

const router = Router()

const SALT_ROUNDS = 10
const MIN_PASSWORD_LENGTH = 8

const validateEmailAndPassword = (
    email: string,
    password: string
): string | null => {
    if (!email || !password) return 'Email and password are required'
    if (!validator.isEmail(email)) return 'Invalid email format'
    if (password.length < MIN_PASSWORD_LENGTH)
        return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
    return null
}

router.post('/register', async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body

    try {
        const validationError = validateEmailAndPassword(email, password)
        if (validationError) {
            res.status(400).json({ message: validationError })
            return
        }

        const user = await prisma.user.findUnique({ where: { email } })
        if (user) {
            res.status(409).json({
                message: 'This email is already registered',
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword },
        })

        res.status(201).json({
            message: 'Registration successful',
            user: { id: newUser.id, email: newUser.email },
        })
    } catch (error) {
        console.error('Error during registration:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body

    try {
        const validationError = validateEmailAndPassword(email, password)
        if (validationError) {
            res.status(400).json({ message: validationError })
            return
        }

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' })
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' })
            return
        }

        const token = generateToken({ id: user.id, email: user.email })

        res.status(200)
            .header('Authorization', `Bearer ${token}`)
            .json({
                message: 'Login successful',
                token,
                user: { id: user.id },
            })
    } catch (error) {
        console.error('Error during login:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})
export default router
