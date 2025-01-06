import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    // Create a new task
    const newTask = await prisma.task.create({
        data: {
            name: 'Learn Prisma',
            description: 'Understand how to use Prisma for database queries',
            completed: false,
        },
    })
    console.log('New Task Created:', newTask)

    // Fetch all tasks
    const allTasks = await prisma.task.findMany()
    console.log('All Tasks:', allTasks)
}

main()
    .catch((error) => {
        console.error('Error:', error)
    })
    .finally(async () => {
        await prisma.$disconnect() // Close the Prisma connection
    })
