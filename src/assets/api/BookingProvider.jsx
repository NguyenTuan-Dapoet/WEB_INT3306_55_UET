
import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';  // Import AuthContext để gọi logout
import { GoogleAuthContext } from '../../assets/api/GoogleAuthProvider';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../components/Hook/useLogOut.js';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bookingResponse, setBookingResponse] = useState(null);
    const { api_isLogin, api_logout } = useContext(AuthContext);
    const { gg_isLogin, gg_logout } = useContext(GoogleAuthContext);
    const navigate = useNavigate();

    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // const handleLogout = () => {
    //     api_isLogin ? api_logout() : gg_logout();
    // }

    const handleLogout = useLogout();

    const createBooking = async (userId, flightId, token, bookingData) => {
        setLoading(true);
        setError(null); // Đặt lại lỗi trước khi gửi yêu cầu
        try {

            // console.log("Delaying API call for 10 seconds...");
            // await delay(10000000); // Delay 10 giây

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

            const responseText = await response.text(); // backend: nếu thành -> success
            console.log("API response", responseText);

            // Kiểm tra nếu có lỗi 401 và logout người dùng
            if (!response.ok) {
                if (response.status === 401) {
                    // handleLogout();  // Gọi logout nếu lỗi 401
                    // navigate('/401');
                    throw new Error('Phiên làm việc đã hết. Vui lòng đăng nhập lại.');
                }
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
        <BookingContext.Provider value={{ createBooking, loading, error, setError, bookingResponse, setBookingResponse }}>
            {children}
        </BookingContext.Provider>
    );
};

export { BookingContext };
