

import React, { useContext, useState, useEffect } from 'react';
import { TicketContext } from '../../../assets/api/TicketProvider.jsx';
import TicketForm from '../TicketForm/TicketForm';
import './TicketField.css';
import LoadingState from '../../../components/LoadingState/LoadingState.jsx';

const TicketField = () => {
    const { tickets, loading, error, fetchTickets } = useContext(TicketContext);
    const [localTickets, setLocalTickets] = useState([]); // State cục bộ để quản lý tickets

    useEffect(() => {
        const token = localStorage.getItem('app_token'); // Lấy token từ localStorage
        if (token) {
            fetchTickets(token);
        } else {
            alert('Token is missing. Please log in again.');
        }
    }, []);

    useEffect(() => {
        setLocalTickets(tickets); // Cập nhật state cục bộ khi tickets từ context thay đổi
    }, [tickets]);

    // Hàm cập nhật trạng thái ticket khi hủy thành công
    const updateTicketStatus = (bookingId) => {
        setLocalTickets((prevTickets) =>
            prevTickets.map((ticket) =>
                ticket.bookingId === bookingId ? { ...ticket, status: 'CANCELLED' } : ticket
            )
        );
    };

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="ticket-container">
            <h2>My Tickets</h2>
            {localTickets.length === 0 ? (
                <p className='notification'>No tickets available.</p>
            ) : (
                //in từ dưới lên: mới->cũ
                <div className="ticket-list">   
                    {localTickets.slice().reverse().map((ticket, index) => (
                        <TicketForm
                            key={index}
                            ticket={ticket}
                            onCancelSuccess={() => updateTicketStatus(ticket.bookingId)}
                        />
                    ))}

                </div>
            )}
        </div>
    );
};

export default TicketField;
