import * as flightModel from '../models/Flight.js';

export const searchFlight = async (req, res) => {
  try {
    const { from, to, departureTime, arrivalTime, flightClass } = req.query; // Changed from req.params to req.query for query parameters
    const flights = await flightModel.searchFlight({ from, to, departureTime, arrivalTime, flightClass });
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllFlights = async (req, res) => {
    try {
      const flights = await flightModel.getAllFlights();
      res.json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getFlightById = async (req, res) => {
    try {
      const flight = await flightModel.getFlightById(parseInt(req.params.id));
      if (!flight) {
        return res.status(404).json({ error: 'flight not found' });
      }
      res.json(flight);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
