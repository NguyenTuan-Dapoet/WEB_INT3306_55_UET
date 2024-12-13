import React from "react";
import "./TicketForm.css";
import { PiAirplaneInFlightLight } from "react-icons/pi";
import DateTimeComponent from "../../../components/DateSelect/formatDateTime";

const TicketForm = ({ ticket }) => {
    const handlePrintInvoice = () => {
        window.open(`http://localhost:8080/pdf/${ticket.pdfs}`, "_blank");
    }

    return (
        <div className="ticket">
            <div className="ticket-left">
                <div className="ticket-left-header">
                    <p>BOARDING PASS</p>
                </div>

                <div className="content">
                    <div className="section-from">
                        <p className="section-label">FROM:</p>
                        <div className="section-details">
                            <span className="airport-code">{ticket.originCode}</span>
                            <span className="city">{ticket.originName}</span>

                            <div className="date-time">
                                <DateTimeComponent departureTime={ticket.departureTime} />
                            </div>
                        </div>
                    </div>
                    <div className="plane-icon-ticket">
                        <PiAirplaneInFlightLight />
                    </div>

                    <div className="section-to">
                        <p className="section-label">TO:</p>
                        <div className="section-details">
                            <span className="airport-code">{ticket.destinationCode}</span>
                            <span className="city">{ticket.destinationName}</span>
                            <div className="date-time">
                                <DateTimeComponent departureTime={ticket.arrivalTime} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info">
                    <div className="info-section">
                        <span>Passenger Name: </span>
                        <span>{ticket.flightNumber}</span>
                    </div>

                    <div className="info-section">
                        <span>Flight: </span>
                        <span>{ticket.aircraftCode}</span>
                    </div>

                    <div className="info-section">
                        <span>Seat: </span>
                        <span>trống</span>
                    </div>

                </div>
            </div>

            <div className="ticket-divider"></div>

            <div className="ticket-right">
                <div className="ticket-right-header">
                    <p>BOARDING <br /> PASS</p>
                </div>

                {/* Thêm phần trạng thái */}
                <div className="ticket-status">
                    <span>Status: </span>
                    <span
                        className={`status ${ticket.status === "accept" ? "status-accept" : "status-pending"}`}
                    >
                        {ticket.status}
                    </span>
                </div>

                {/* Nút bấm in hóa đơn */}
                <button className="print-button" onClick={handlePrintInvoice}>
                    Print Invoice
                </button>

            </div>
        </div>
    );
};

export default TicketForm;
