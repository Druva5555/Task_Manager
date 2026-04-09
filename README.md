# My Task Manager Project

I put this project together to create a simple, no-fuss way to track tasks. It’s got a clean React frontend and a Node.js API that talks to a Postgres database. I used Prisma to keep the database stuff easy to manage and type-safe.

The whole thing is containerized with Docker, so you don't have to worry about installing a bunch of dependencies manually just to see it work.

### Getting it up and running

The easiest way to see everything in action is using Docker. If you have Docker and Docker Compose ready, just do this:

1. Open your terminal in this folder.
2. Run `docker-compose up --build`.

That’s basically it. The database spins up, the API starts talking to it, and the frontend connects to the API.
*   **The App:** [http://localhost:5173](http://localhost:5173)
*   **The API:** [http://localhost:5000](http://localhost:5000)

### If you want to run it manually

You can also run the pieces yourself if you prefer. You'll just need a Postgres instance running somewhere.

**For the Backend:**
Go into the `server` folder and run `npm install`. You'll need an `.env` file (I left an example in there) with your database connection string. Then run `npx prisma db push` to set up the tables and `npm run dev` to start the server.

**For the Frontend:**
Go into the `client` folder, run `npm install`, and then `npm run dev`. It'll give you a local URL to open in your browser.

### A quick look at how it works

- **The UI:** I built the frontend with React and Vite. I decided to stick with plain CSS for the styling because I wanted total control over the look without dragging in a heavy framework. It’s responsive and has a "premium" feel thanks to some custom CSS variables.
- **The API:** It’s a standard Express server. I laid it out using a simple routes-and-controllers structure to keep the code clean. 
- **The Database:** Prisma handles the heavy lifting here. I set up a relationship where tasks are linked to users. To keep things simple for now, the server creates a "Default User" automatically if it doesn't see one, so you can start adding tasks immediately without needing to build a whole login system first.
- **Snappy Updates:** I added "optimistic updates" to the status toggles. This means the UI responds the second you click a button, and if the network fails, it just rolls back the change. It feels much faster that way.

### What's in the folders?

- `client/`: All the React components like the task form and list.
- `server/`: The Express logic, including the controllers and the Prisma schema.
- `docker-compose.yml`: The blueprint for the containers.

I'm pretty happy with how it turned out. If I had more time, I'd probably add real user accounts with passwords and maybe some better search/filter options for the task list.

