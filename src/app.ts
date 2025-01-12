import express from 'express'
import { Request, Response } from 'express'

import tasksRouter from './routes/tasks'
import authRouter from './routes/auth'

const app = express()

app.use(express.json())

// Base route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to task manager API!')
})

// Auth
app.use('/api/auth', authRouter)

// Task routes
app.use('/api/tasks', tasksRouter)

export default app
