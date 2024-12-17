import React, { useContext, useState, useEffect } from 'react';
import { TicketContext } from '../../../assets/api/TicketProvider.jsx';
import TicketForm from '../TicketForm/TicketForm';
import './TicketField.css';
import LoadingState from '../../../components/LoadingState/LoadingState.jsx'; // Import LoadingState
const TicketField = () => {
    const { tickets, loading, error, fetchTickets } = useContext(TicketContext);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('app_token'); // Lấy token từ localStorage
        if (token) {
            fetchTickets(token); // Gọi API khi component được render lần đầu
        } else {
            alert('Token is missing. Please log in again.');
        }
    }, [hasFetched]);

    if (loading) {
        return <LoadingState />; 
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="ticket-container">
            <h2>My Tickets</h2>
            {tickets.length === 0 ? (
                <p className='notification'>No tickets available.</p>
            ) : (
                <div className="ticket-list">
                    {tickets.map((ticket, index) => (
                        <>
                            <TicketForm key={index} ticket={ticket} createAt={"2024-12-18 00:20:12.217419"} />
                            <TicketForm key={index} ticket={ticket} createAt={"2024-12-18 00:28:12.217419"} />
                        </>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TicketField;