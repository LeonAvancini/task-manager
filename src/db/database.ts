import sqlite3 from 'sqlite3'

// Open db connection
const database = new sqlite3.Database('./src/db/tasks.db', (error) => {
    if (error) {
        console.error('Error connection to SQLite database:', error.message)
    } else {
        console.log('Connected to SQLite database')
    }
})

//Create task table
database.run(
    `
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `,
    (err) => {
        if (err) {
            console.error('Error creating tasks table:', err.message)
        } else {
            console.log('Tasks table is ready')
        }
    }
)

export default database
