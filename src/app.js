import express from 'express';
import prisma from './prisma.js';
import userRoutes from './routes/userRoutes.js';
import flightRoutes from './routes/flightRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/flights', flightRoutes);


const server = app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  try {
    // Connect to the database
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  server.close();
});