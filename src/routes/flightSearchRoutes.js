import express from 'express';
import searchFlights from '../controllers/flightSearchController.js';

const router = express.Router();

router.get('/', searchFlights);

export default router;