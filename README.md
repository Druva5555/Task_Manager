# Task Manager Application

A minimal full-stack task management application built with Node.js (Express), React (Vite), and PostgreSQL (Prisma).

## Setup Instructions

### Prerequisites
- Docker and Docker Compose installed.
- Node.js (v18+) if running locally.

### Running with Docker (Recommended)
1. Clone the repository.
2. In the root directory, run:
   ```bash
   docker-compose up --build
   ```
3. Access the services:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Running Locally
1. **Database**: Ensure a PostgreSQL instance is running.
2. **Backend**:
   - `cd server`
   - `npm install`
   - Update `.env` with your `DATABASE_URL`.
   - `npx prisma migrate dev`
   - `npm run dev`
3. **Frontend**:
   - `cd client`
   - `npm install`
   - `npm run dev`

## Folder Structure
- `/server`: Express backend, Prisma schema, and controllers.
- `/client`: React frontend with Vite, components, and services.
- `/docker-compose.yml`: Container orchestration for DB, Back, and Front.

## Technical Choices & Assumptions
- **Prisma 7**: Used for modern type-safe database access and streamlined migrations.
- **MVC Architecture**: Separated routes and controllers for better maintainability.
- **Optimistic Updates**: Implemented on the frontend for immediate feedback during status changes.
- **Design System**: A custom modern CSS system using CSS variables for high-quality visuals without heavy libraries.
- **Default User**: The system auto-seeds a default user to fulfill the task-to-user relation requirement without a full auth flow.

## Future Improvements
- **Authentication**: JWT-based login and registration.
- **Real-time Updates**: Socket.io for collaborative task management.
- **Performance**: Redis caching for frequently accessed task lists.
- **Testing**: Comprehensive unit and integration tests with Jest and Playwright.

## Environment Variables
Copy `.env.example` in the `server` folder to `.env` and fill the database URL if you are running your own Postgres:
```bash
# In the /server directory
cp .env.example .env

### 2. Install Dependencies
```bash
# In the server directory
cd server
npm install

# In the client directory
cd ../client
npm install
```

### 3. Setup Database (Prisma)
Ensure your postgres database is running. Then, let Prisma setup the tables:
```bash
cd server
npx prisma db push
npx prisma generate
```

### 4. Run the Application
#### Start Backend
```bash
cd server
npm run dev
```

#### Start Frontend
```bash
cd client
npm run dev
```

---

## Folder Structure

```
Task_Manager/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (TaskForm, TaskList, TaskItem)
│   │   ├── services/       # API clients (axios config)
│   │   ├── App.jsx         # Main layout and centralized state
│   │   └── App.css         # Premium Vanilla CSS styling
│   └── package.json        
├── server/                 # Node.js/Express Backend
│   ├── controllers/        # Request handlers (Task CRUD)
│   ├── middlewares/        # Express middlewares (Validation)
│   ├── prisma/             # Prisma ORM Schema & Migrations
│   ├── routes/             # Express API routers
│   ├── index.js            # Server entrypoint and User Seeding
│   └── package.json
└── docker-compose.yml      # Orchestrates Postgres, Server, and Client
```

---

## Assumptions & Trade-offs
1. **User Auth Simplification (Bonus)**: To fulfill the Foreign Key / User Reference bonus without forcing the user to build out an entire registration/login UI, the backend will automatically seed a "Default User" into the database on startup. All tasks created are linked to this user's `id`. This correctly implements the relational schema requirements.
2. **Optimistic UI vs Backend Truth**: The client aggressively updates the state for status changes for a snappier feel. To prevent data corruption, if the backend rejects the change, the state locally reverts to the previous snapshot without requiring another fetch.
3. **Database Setup**: We opted for Prisma ORM rather than raw SQL `pg` queries. This inherently handles SQL Injection protection and type safety, but trade-offs include slightly heavier node dependencies compared to raw drivers.

## Future Improvements
- **Authentication**: Implementing JWT-based auth and assigning users real tokens, removing the "Default User" seed.
- **Form Validation (Frontend)**: Implementing react-hook-form or Yup to validate the Task shape before calling the backend.
- **Global State**: Transitioning the `tasks` state out of `App.jsx` and into a global store like Redux or React Query (TanStack Query) to manage the caching layer better and improve pagination UX.
