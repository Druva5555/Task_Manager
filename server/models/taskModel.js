const db = require('../config/db');


const initTaskTable = async () => {
  const queryText = `
    DO $$ BEGIN
      CREATE TYPE task_status AS ENUM ('todo', 'in-progress', 'done');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      description TEXT,
      status task_status DEFAULT 'todo',
      "dueDate" TIMESTAMP NULL,
      "createdAt" TIMESTAMP DEFAULT NOW(),
      "updatedAt" TIMESTAMP DEFAULT NOW()
    );
  `;
  
  try {
    await db.query(queryText);
    console.log('Task table initialized successfully.');
  } catch (err) {
    console.error('Error initializing task table:', err);
  }
};

module.exports = {
  initTaskTable,
};
