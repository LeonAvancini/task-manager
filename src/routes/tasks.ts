import { Request, Router, Response } from 'express'
import { Task } from '../types/Task'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Here are your tasks',
        tasks: [],
    })
})

router.post('/', (req: Request, res: Response) => {
    const task: Task = req.body

    res.json({
        message: `Task created`,
        task,
    })
})

router.put('/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const task: Task = req.body

    res.json({
        message: `Task ${id} updated`,
        task,
    })
})

router.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id

    res.json({
        message: `Task ${id} deleted`,
    })
})

export default router
