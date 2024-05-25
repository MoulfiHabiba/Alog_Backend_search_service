import axios from "axios";

//simulation of get registary results
//all airlines
const airlinesConfig = [
    {
        baseURL: 'https://airlinesimulation.onrender.com',
        endpoint:{
            path: 'trips/filter',
            params:{
                departure: 'takeoffPlace',
                arrival: 'landingPlace',
                departure_date: 'takeoffTime',
                arrival_date: 'landingTime',
                classe: 'ticketClass'
            },
            responseMapping:{
                id: 'flightId',
                description: 'flightDesc',
                departure: 'takeoffPlace',
                arrival: 'landingPlace',
                departure_date: 'takeoffTime',
                arrival_date: 'landingTime',
                classe: 'ticketClass'
            }
        }
    },
    {
        baseURL: 'https://alog-backend.onrender.com',
        endpoint:{
            path: 'flights/search',
            params:{
                departure: 'from',
                arrival: 'to',
                departure_date: 'departureTime',
                arrival_date: 'arrivalTime',
                classe: 'flightClass'
            },
            responseMapping:{
                id: 'id',
                description: 'description',
                departure: 'from',
                arrival: 'to',
                departure_date: 'departureTime',
                arrival_date: 'arrivalTime',
                classe: 'flightClass'
            },
        }
    }
]


const buildApiUrl = (queryParams, flight) => {
    const paramsMapping = flight.Endpoint[0].Params[0];

    const searchParams = {
        [paramsMapping.departure]: queryParams.departure ,
        [paramsMapping.arrival]: queryParams.arrival,
        [paramsMapping.departure_date]: queryParams.departure_date,
        [paramsMapping.arrival_date]: queryParams.arrival_date,
        [paramsMapping.classe]: queryParams.classe,
    };

    // Construct search URL with query params
    const searchURL = new URL(`${flight.baseURL}/${flight.Endpoint[0].path}`);
    Object.keys(searchParams).forEach((key) =>{
        if(!!searchParams[key]){
            searchURL.searchParams.append(key, searchParams[key])
        }
    });

    return searchURL.href
}


const mappResponse = (searchResults,responseMapping) => {
    const standardResults = searchResults.map((result) => {
        const mappedResult = {};
        for (const key in responseMapping) {
            mappedResult[key] = result[responseMapping[key]];
        }
        return mappedResult;
    });
    return standardResults;
}

const callAPI = async(url) =>{
    const response = await axios.get(url);
    if(!response){
        throw new Error(`Error fetching data from ${url}`)
    }
    return response.data;
}

const getFlights =  async (queryParams, flight) => {
    const searchURL = buildApiUrl(queryParams,flight);
    try {
        const response = await callAPI(searchURL);
        const mappedData = mappResponse(response,flight.Endpoint[0].ResponseMapping[0])
        return mappedData;
    } catch (error) {
        console.error(`Error fetching flights from Airline:`, error);
        throw error;
    }
}


const searchFlights = async (req, res) => {
    const queryParams = req.query;
    try {
        const allFlights = await callAPI("https://service-registery-flight-reservation.onrender.com/airlines");
        let result = [];

        for (const airline of allFlights.data) {
            const response = await getFlights(queryParams, airline);
            result.push(...response);
        }

        res.json([...result]);  // Don't forget to return the result if needed

    } catch (error) {
        console.error(error);
    }
}

export default searchFlights;
