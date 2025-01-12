import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error(
        'JWT_SECRET is not defined. Please set it in the environment variables.'
    )
}

export const generateToken = (payload: object, expiresIn: string = '1h') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (error) {
        throw new Error('Invalid or expired token')
    }
}
