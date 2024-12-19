// import React, { createContext, useState } from 'react';

// // Tạo context cho ticket
// export const TicketContext = createContext();

// export const TicketProvider = ({ children }) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [tickets, setTickets] = useState([]);

//     // Hàm fetch dữ liệu từ API
//     const fetchTickets = async (token) => {
//         setLoading(true);
//         setError(null); // Reset lỗi trước khi gửi yêu cầu
//         try {
//             const response = await fetch('http://localhost:8080/bookings/bookingInformation', {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`, // Thêm token vào header
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to fetch tickets');
//             }

//             const data = await response.json(); // API trả về dữ liệu dạng JSON
//             setTickets(data); // Lưu dữ liệu vào state

//             //--------------test----------------
//             console.log("ticket response" ,response);
//             console.log("ticket data",data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <TicketContext.Provider value={{ tickets, loading, error, fetchTickets }}>
//             {children}
//         </TicketContext.Provider>
//     );
// };


import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';  // Thêm import AuthContext
import { useLogout } from '../../components/Hook/useLogOut'; // Thêm import useLogout

// Tạo context cho ticket
export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
    const { logout } = useContext(AuthContext);  // Lấy logout từ AuthContext
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate(); // Khởi tạo navigate để điều hướng

    // Hàm fetch dữ liệu từ API
    const fetchTickets = async (token) => {
        setLoading(true);
        setError(null); // Reset lỗi trước khi gửi yêu cầu
        try {
            const response = await fetch('http://localhost:8080/bookings/bookingInformation', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Thêm token vào header
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                // Kiểm tra nếu là lỗi 401 (Unauthorized)
                if (response.status === 401) {
                    const handleLogout = useLogout();
                    handleLogout();  // Gọi logout nếu lỗi 401
                    navigate('/401');
                    throw new Error('Phiên làm việc đã hết. Vui lòng đăng nhập lại.');
                }
                throw new Error('Failed to fetch tickets');
            }

            const data = await response.json(); // API trả về dữ liệu dạng JSON
            setTickets(data); // Lưu dữ liệu vào state

            //--------------test----------------
            console.log("ticket response", response);
            console.log("ticket data", data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TicketContext.Provider value={{ tickets, loading, error, fetchTickets }}>
            {children}
        </TicketContext.Provider>
    );
};
