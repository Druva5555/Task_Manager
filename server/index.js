require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const prisma = require('./prisma');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API Server Running');
});

const initDefaultUser = async () => {
  try {
    let defaultUser = await prisma.user.findFirst();
    if (!defaultUser) {
      defaultUser = await prisma.user.create({
        data: {
          name: 'Default User',
          email: 'default@example.com'
        }
      });
      console.log('Default seed user created.');
    }
  } catch (error) {
    console.error('Failed to seed default user:', error);
  }
};

app.listen(port, async () => {
  await initDefaultUser();
  console.log(`Server is running on port ${port}`);
});
