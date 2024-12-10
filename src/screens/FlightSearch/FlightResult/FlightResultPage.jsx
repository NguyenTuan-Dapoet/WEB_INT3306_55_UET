import React, { useEffect, useState } from "react";
import { FlightResult } from "./FlightResult";
import { RATING_SCALE } from "../../../lib/constants";
import { endOfDay, startOfDay } from "date-fns";
import "./FlightResultPage.css";
import { flights } from '../../../assets/flights_asset';

function FlightResultPage({ searchParams }) {
    const [flightResult, setFlightResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // gọi data dữ liệu giả từ file flights_asset.js

    useEffect(() => {
        // Set loading to true whenever new search params are provided
        setLoading(true);

        const departDateStart = new Date(searchParams?.departDate || new Date());
        departDateStart.setHours(departDateStart.getHours(), departDateStart.getMinutes());
        if (new Date().getDate() !== departDateStart.getDate()) {
            departDateStart.setHours(0, 0, 0, 0); // Ensure start of day
        }

        const departDateEnd = endOfDay(departDateStart); // End of the day for filtering flights

        // Filter flights based on searchParams
        const filteredFlights = flights.filter((flight) => {
            const validSeats = flight.seats.filter(
                (seat) => seat.class === searchParams?.class && seat.availability
            );
            return (
                flight.originAirportId.code === searchParams?.departureAirportCode &&
                flight.destinationAirportId.code === searchParams?.arrivalAirportCode &&
                new Date(flight.departureDateTime) >= departDateStart &&
                new Date(flight.departureDateTime) <= departDateEnd &&
                validSeats.length >= (searchParams?.passengers || 1)
            );
        });

        // Simulate review and rating processing (sync)
        const processedFlights = filteredFlights.map((flight) => {
            const currentFlightRatingsSum = flight.reviews.reduce(
                (acc, review) => acc + review.rating,
                0
            );
            const rating = flight.reviews.length
                ? (currentFlightRatingsSum / flight.reviews.length).toFixed(1)
                : "N/A";

            return {
                ...flight,
                price: flight.price[searchParams?.class].base,
                rating,
                ratingScale: RATING_SCALE[Math.floor(rating)] || "N/A",
            };
        });

        // Set the filtered and processed flights in the state
        setFlightResult(processedFlights);
        setLoading(false); // Set loading to false after processing
    }, [searchParams]); // Trigger the effect when searchParams change

    if (loading) {
        return <div className="loading">Loading flights...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!flightResult.length) {
        return <div className="no-data">No flights found.</div>;
    }

    return <FlightResult flightResults={flightResult} />;
}
export default FlightResultPage;