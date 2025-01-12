import { Request, Router, Response } from 'express'
import prisma from '../db/prisma'
import { authenticate } from '../middlewares/auth'
import { handleError } from '../utils/handleError'
import {
    validateCreateTask,
    validateTaskIdentifier,
} from '../validations/taskValidations'
import { validateUserId } from '../validations/userValidations'

const router = Router()

router.use(authenticate)

router.get('/', validateUserId, async (req: Request, res: Response) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { userId: req.userId },
        })
        res.json({ tasks })
    } catch (error) {
        handleError(res, 500, 'Error fetching tasks', error)
    }
})

router.post('/', validateCreateTask, async (req: Request, res: Response) => {
    try {
        const { userId, name, description } = req.body

        const task = await prisma.task.create({
            data: { userId, name, description },
        })

        res.status(201).json({
            message: 'Task created successfully',
            task,
        })
    } catch (error) {
        handleError(res, 500, 'Error creating tasks', error)
    }
})

router.put(
    '/:id',
    validateTaskIdentifier,
    async (req: Request, res: Response) => {
        try {
            const { taskId, userId } = req.body

            const userTask = await prisma.task.findFirst({
                where: { id: taskId, userId },
            })

            if (!userTask) {
                return handleError(res, 404, 'Task not found')
            }

            const updatedTask = await prisma.task.update({
                where: { id: taskId },
                data: { completed: !userTask.completed },
            })

            res.json({
                message: 'Task updated successfully',
                task: updatedTask,
            })
        } catch (error) {
            handleError(res, 500, 'Error updating task', error)
        }
    }
)

router.delete(
    '/:id',
    validateTaskIdentifier,
    async (req: Request, res: Response) => {
        try {
            const { taskId, userId } = req.body

            const existingTask = await prisma.task.findFirst({
                where: { id: taskId, userId },
            })

            if (!existingTask) {
                return handleError(res, 404, 'Task not found')
            }

            await prisma.task.delete({
                where: { id: taskId },
            })
            res.json({ message: `${existingTask.name} deleted successfully!` })
        } catch (error) {
            handleError(res, 500, 'Error deleting task', error)
        }
    }
)

export default router
