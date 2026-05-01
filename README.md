# Primetrade Task Management System

A full-stack, role-based task management application built with Node.js, Express, MongoDB, and Next.js 15.

## Features
* **Secure Authentication:** HTTP-only cookies with JWT.
* **Role-Based Access Control (RBAC):** Admin and User roles.
* **Full-Stack Integration:** Next.js 15 App Router frontend connected to a RESTful backend.
* **Responsive UI:** Modern, high-contrast dark mode aesthetic.

## Quick Start
1. Clone the repository.
2. Run `npm install` in both the `/backend` and `/frontend` directories.
3. Setup your `.env` in the backend with `MONGO_URI`, `JWT_SECRET`, and `PORT=5000`.
4. Run `npm run dev` in both directories.
5. Access the app at `http://localhost:3000`.

---

## API Documentation

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Body | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/register` | Create a new account | `{ email, password, role }` | No |
| **POST** | `/login` | Authenticate user & set cookie | `{ email, password }` | No |
| **POST** | `/logout` | Clear auth cookies | None | Yes |

### Tasks (`/api/tasks`)

| Method | Endpoint | Description | Body | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/` | Create a new task | `{ title, description, status }` | Yes |
| **GET** | `/` | Get tasks (Admins see all, Users see own) | None | Yes |
| **PUT** | `/:id` | Update a task by ID | `{ title, description, status }` | Yes |
| **DELETE**| `/:id` | Delete a task by ID | None | Yes |

*Note: All protected routes expect an HTTP-Only cookie named `accessToken` containing a valid JWT.*



### Architecture & Scalability Note

While the current monolithic architecture is sufficient for initial deployment and testing, the system is designed with future scalability in mind. To handle enterprise-level traffic, I would implement the following scaling strategies:

1. **Caching Layer (Redis):** Frequent read operations, such as fetching the task list for a specific user, should be cached in Redis. This reduces the load on the MongoDB cluster and drops response times to single-digit milliseconds.
2. **Horizontal Scaling & Load Balancing:** The Node.js backend is stateless (auth is handled via JWTs, not server-side sessions). This allows us to spin up multiple instances of the backend across different availability zones behind a Load Balancer (e.g., NGINX or AWS ALB) to distribute incoming traffic evenly.
3. **Microservices Transition:** As the feature set grows, the `Auth` module and the `Task` module can be decoupled into independent microservices. This allows the high-traffic Task service to be scaled independently of the Auth service.
4. **Database Optimization:** Implementing proper indexing on the MongoDB `createdBy` and `status` fields will prevent full collection scans as the database grows to millions of records.
