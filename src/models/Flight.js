import prisma from '../prisma.js';

export const searchFlight = async ({ from, to, departureTime, arrivalTime, flightClass }) => {
  const filters = {};

  if (from) filters.from = from;
  if (to) filters.to = to;
  if (departureTime) filters.departureTime = new Date(departureTime);
  if (arrivalTime) filters.arrivalTime = new Date(arrivalTime);
  if (flightClass) filters.flightClass = flightClass;

  return await prisma.flight.findMany({
    where: {
      AND: [
        ...Object.entries(filters).map(([key, value]) => ({ [key]: value }))
      ]
    }
  });
};

export const getAllFlights = async () => {
    return await prisma.flight.findMany();
  };
  
  export const getFlightById = async (id) => {
    return await prisma.flight.findUnique({ where: { id } });
  };
