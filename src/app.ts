import express from 'express'
import { Request, Response } from 'express'

import tasksRouter from './routes/tasks'

const app = express()

app.use(express.json())

// Base route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to task manager API!')
})

// Task routes
app.use('/api/tasks', tasksRouter)

export default app
