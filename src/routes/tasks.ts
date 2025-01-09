import { Request, Router, Response } from 'express'
import { Task } from '@prisma/client'
import prisma from '../db/prisma'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const tasks = await prisma.task.findMany()
        res.json({ tasks })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error fetching tasks' })
    }
})

router.post('/', async (req: Request, res: Response) => {
    const { name, description }: Task = req.body

    if (!name) {
        res.status(400).json({ message: 'Task name is required' })
        return
    }

    try {
        await prisma.task.create({
            data: {
                name,
                description,
            },
        })

        res.status(201).json({
            message: 'Task created successfully',
        })
    } catch (error) {
        console.error('Error creating task:', error)
        res.status(500).json({ message: 'Error creating task' })
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.params.id, 10)

        if (isNaN(taskId)) {
            res.status(400).json({ message: 'Invalid task ID' })
            return
        }

        const existingTask = await prisma.task.findUnique({
            where: { id: taskId },
        })

        if (!existingTask) {
            res.status(404).json({ message: 'Task not found' })
            return
        }

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: { completed: !existingTask.completed },
        })

        res.json({ message: 'Task updated successfully', task: updatedTask })
    } catch (error) {
        console.error('Error updating task:', error)
        res.status(500).json({ message: 'Error updating task' })
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.params.id, 10)

        if (isNaN(taskId)) {
            res.status(400).json({ message: 'Invalid task ID' })
            return
        }

        const existingTask = await prisma.task.findUnique({
            where: { id: taskId },
        })

        if (!existingTask) {
            res.status(404).json({ message: 'Task not found' })
            return
        }

        await prisma.task.delete({ where: { id: taskId } })
        res.json({ message: `${existingTask.name} deleted successfully!` })
    } catch (error) {
        console.error('Error deleting task:', error)
        res.status(500).json({ message: 'Error deleting task' })
    }
})

export default router
