require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API Server Running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
