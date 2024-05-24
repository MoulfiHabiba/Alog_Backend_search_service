import express from 'express';
import flightRoutes from './routes/flightSearchRoutes.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.use('/search', flightRoutes);


app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
