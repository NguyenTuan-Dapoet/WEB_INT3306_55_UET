import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bookingResponse, setBookingResponse] = useState(null);

    const createBooking = async (userId, flightId, token, bookingData) => {
        setLoading(true);
        setError(null); // Đặt lại lỗi trước khi gửi yêu cầu
        try {
            const response = await fetch(
                `http://localhost:8080/bookings/createBooking/user/${userId}/flight/${flightId}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookingData),
                }
            );

            const responseText = await response.text(); // backend: nếu thành -> susccess
            console.log("API response", responseText);

            // Kiểm tra nếu có lỗi
            if (!response.ok) {
                // throw new Error(responseText || 'Failed to create booking');
                throw new Error('Failed to create booking');
            }
            setBookingResponse(responseText); 
        } catch (err) {
            setError(`error API: ${err.message}`);
            console.log("API error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <BookingContext.Provider value={{ createBooking, loading, error, bookingResponse }}>
            {children}
        </BookingContext.Provider>
    );
};

export { BookingContext }
