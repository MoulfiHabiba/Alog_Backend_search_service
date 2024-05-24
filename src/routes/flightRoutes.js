import express from 'express';
import {
    searchFlight,
    getFlightById,
    getAllFlights
} from '../controllers/flightController.js';

const router = express.Router();




router.get('/search', searchFlight);

router.get('/', getAllFlights);

router.get('/:id', getFlightById);



export default router;