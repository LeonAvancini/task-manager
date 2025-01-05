### Project structure

project/
├── src/
│   ├── app.ts          # Main entry point
│   ├── server.ts       # Server bootstrap
│   ├── config/         # Configuration files (e.g., environment variables)
│   │   └── index.ts
│   ├── routes/         # API route definitions
│   │   └── index.ts    # Root router
│   │   └── tasks.ts    # Task-related routes
│   ├── controllers/    # Route handlers and logic
│   │   └── tasks.ts
│   ├── models/         # Database models or interfaces
│   │   └── task.ts
│   ├── db/             # Database connection and setup
│   │   └── index.ts
│   ├── middlewares/    # Express middlewares
│   │   └── errorHandler.ts
│   ├── utils/          # Utility functions
│   ├── types/          # Custom TypeScript types
│   │   └── index.d.ts
├── dist/               # Compiled files (auto-generated)
├── tsconfig.json       # TypeScript configuration
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── README.md           # Documentation

