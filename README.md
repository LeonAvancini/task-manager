# Task Manager

This project was created for **learning purposes**, focusing on fundamental backend concepts using **Node.js** and **Express.js**. The goal was to gain hands-on experience with:

- **Routing**: Setting up and handling different HTTP methods and routes.
- **Middlewares**: Creating and using custom middlewares for authentication and request validation.
- **JWT**: Implementing secure user authentication using JSON Web Tokens.
- **Password Encryption**: Safely storing passwords by hashing them with bcrypt.
- **Request Validation**: Validating incoming requests using Zod.
- **Basic Behaviors**:
    - Managing relationships between users and tasks.
    - Implementing CRUD operations for tasks.

## Features

- **User Authentication**:

    - Register and login with encrypted passwords.
    - JWT-based authentication for securing routes.

- **Task Management**:

    - Create, read, update, and delete tasks associated with authenticated users.
    - User-specific task scoping to ensure data privacy.

- **Input Validation**:

    - Schema-based request validation using Zod.
    - Middleware to handle validation errors and provide clear feedback.

- **Error Handling**:
    - Centralized error handling for consistent responses.
    - Differentiated handling for validation, authentication, and unexpected errors.

## Technologies Used

- **Node.js**
- **Express.js**
- **Prisma**: For database operations.
- **JWT**: For secure user authentication.
- **Bcrypt**: For password encryption.
- **Zod**: For request validation.
- **SQLite**: Lightweight database for learning purposes.


## What I Learned

1. **Backend Fundamentals**:

    - Setting up an Express server.
    - Structuring a backend project for scalability.

2. **Authentication**:

    - Securely managing user login and registration using JWT and bcrypt.

3. **Database Management**:

    - Using Prisma for efficient and type-safe database queries.

4. **Validation**:

    - Using Zod to enforce input data integrity.

5. **Error Handling**:
    - Centralizing error handling for a clean and consistent response structure.

## How to Run

1. **Clone the Repository**:

    ```bash
    git clone <repository-url>
    cd task-manager
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:

    - Create a `.env` file in the root directory.
    - Add the following variables:
        ```env
        PORT=3000
        DATABASE_URL="file:./src/db/tasks.db"
        JWT_SECRET="your_jwt_secret"
        ```

4. **Run Migrations**:

    ```bash
    npx prisma migrate dev
    ```

5. **Start the Server**:

    ```bash
    npm run dev
    ```

6. **API Endpoints**:
    - **Authentication**:
        - POST `/auth/register`
        - POST `/auth/login`
    - **Tasks**:
        - GET `/tasks`
        - POST `/tasks`
        - PUT `/tasks/:id`
        - DELETE `/tasks/:id`

## Future Improvements

- Add unit and integration tests to ensure reliability.
- Deploy the project using a hosting service like Heroku or Vercel.
- Implement additional features such as task priorities and due dates.
- Enhance request validation with more detailed schemas.

---

This project served as a practical introduction to building a backend application with modern tools and practices. It provided hands-on experience with core backend development concepts, laying the foundation for more advanced projects.
