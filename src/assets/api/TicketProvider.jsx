import React, { createContext, useState } from 'react';

// Tạo context cho ticket
export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tickets, setTickets] = useState([]);

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
                throw new Error('Failed to fetch tickets');
            }

            const data = await response.json(); // API trả về dữ liệu dạng JSON
            setTickets(data); // Lưu dữ liệu vào state
        
            //--------------test----------------
            console.log("ticket response" ,response);
            console.log("ticket data",data);
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
 