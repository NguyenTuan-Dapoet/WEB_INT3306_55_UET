import React, { useContext, useState } from 'react';
import { TicketContext } from '../../../assets/api/TicketProvider.jsx';
import './TicketField.css';

const TicketField = () => {
    const { tickets, loading, error, fetchTickets } = useContext(TicketContext);
    const [hasFetched, setHasFetched] = useState(false);

    const handleFetchTickets = () => {
        const token = localStorage.getItem('app_token'); // Lấy token từ localStorage
        if (token) {
            fetchTickets(token);
            setHasFetched(true); // Đánh dấu đã nhấn nút
        } else {
            alert('Token is missing. Please log in again.');
        }
    };

    if (loading) {
        return <p>Loading tickets...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="ticket-container">
            <h2>My Tickets</h2>
            {!hasFetched ? (
                <button onClick={handleFetchTickets} className="fetch-tickets-button">
                    Show My Tickets
                </button>
            ) : tickets.length === 0 ? (
                <p>No tickets available.</p>
            ) : (
                <div className="ticket-list">
                    <pre>{JSON.stringify(tickets, null, 2)}</pre> {/* Hiển thị toàn bộ dữ liệu JSON */}
                </div>
            )}
        </div>
    );
};

export default TicketField;
