import { React, useState, useEffect } from "react";
import "./TicketForm.css";
import { IoAirplane } from "react-icons/io5";
import verticalBarcode from "../../../assets/vertical-barcode.gif";

const TicketForm = ({ ticket }) => {
    const handlePrintInvoice = () => {
        window.open(`http://localhost:8080/pdf/${ticket.pdfs}`, "_blank");
    }

    const [formattedDate, setFormattedDate] = useState('');
    const [formattedTime, setFormattedTime] = useState('');
    const [boardingTime, setBoardingTime] = useState('');

    useEffect(() => {
        if (ticket.departureTime) {
            const departureTime = ticket.departureTime;
            const [datePart, timePart] = departureTime.split("T");

            // Xử lý Date
            const [year, month, day] = datePart.split("-");
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            const date = `${day} ${monthNames[parseInt(month, 10) - 1]} ${year}`;

            // Xử lý Time
            const time = timePart.substring(0, 5); // Chỉ lấy giờ và phút

            // tính giá trị boarding time
            const [hours, minutes] = time.split(":").map(Number);
            const boardingHour = (hours - 1 + 24) % 24; // Đảm bảo giờ không âm (vòng về 24h nếu cần)
            const formattedBoardingHour = boardingHour.toString().padStart(2, "0");
            const boarding = `${formattedBoardingHour}:${minutes.toString().padStart(2, "0")}`;

            setFormattedDate(date);
            setFormattedTime(time);
            setBoardingTime(boarding);
        }
    }, [ticket.departureTime]);


    return (
        <div className="ticket">
            <div className="ticket-barcode">
                <img src={verticalBarcode} alt="barcode" />
            </div>

            <div className="ticket-left">
                <div className="ticket-left-header">
                    <p>{ticket.ticketClass} Class</p>
                </div>

                <div className="info">
                    <div className="info-section">
                        <span>Passenger Name:</span>
                        <span>{ticket.passengerName}</span>
                    </div>

                    <div className="info-section">
                        <span>Flight:</span>
                        <span>{ticket.flightNumber}</span>
                    </div>

                    <div className="info-section">
                        <span>Departure: </span>
                        <span>{formattedTime}</span>
                    </div>

                    <div className="info-section">
                        <span>Date:</span>
                        <span>{formattedDate}</span>
                    </div>



                </div>

                <div className="content">
                    <div className="section-from">
                        {/* <p className="section-label">FROM:</p> */}
                        <div className="section-details">
                            <span className="airport-code">{ticket.originCode}</span>
                            <span className="city">{ticket.originName}</span>

                            {/* <div className="date-time">
                                <DateTimeComponent departureTime={ticket.departureTime} />
                            </div> */}
                        </div>
                    </div>
                    <div className="plane-icon-ticket">
                        <IoAirplane />
                    </div>

                    <div className="section-to">
                        {/* <p className="section-label">TO:</p> */}
                        <div className="section-details">
                            <span className="airport-code">{ticket.destinationCode}</span>
                            <span className="city">{ticket.destinationName}</span>
                            {/* <div className="date-time">
                                <DateTimeComponent departureTime={ticket.arrivalTime} />
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="info">
                    <div className="info-section">
                        <span>Boarding: </span>
                        <span>{boardingTime}</span>
                    </div>

                    <div className="info-section">
                        <span>Gate: </span>
                        <span>trống</span>
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
                    <p>BOARDING PASS</p>
                </div>

                {/* <div className="barcode">
                    <img src="https://barcode.tec-it.com/barcode.ashx?data=++++++++++++++++&code=GS1-128&translate-esc=on" alt="barcode" />
                </div> */}

                <div className="ticket-right-content">
                    <p>{ticket.ticketClass}</p>
                    <p>{ticket.passengerName}</p>
                    <p>{ticket.originCode} - {ticket.destinationCode}</p>                    <p>{ticket.flightNumber}</p>
                    <p>{formattedDate}</p>
                </div>

        {/*      nếu được duyệt:    accept
            nếu chưa được duyệt:    nếu còn thời gian: pending/cancel
                                    nếu hết thời gian: pending*/}
        <div className="ticket-status">
          <span>Status: </span>
          <span
            className={`status ${
              status === "Accept"
                ? "status-accept"
                : status === "Cancel"
                ? "status-cancel"
                : "status-pending"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Hiển thị bộ đếm */}
        {cancelEnabled && (
          <div className="countdown-timer">
            <p>Time to cancel: <strong>{timeLeft} s</strong></p>
          </div>
        )}

        {/* Nút hủy */}
        <button
          className="cancel-button"
          onClick={handleCancelTicket}
          disabled={!cancelEnabled}
        >
          Cancel Ticket
        </button>

        {/* Nút in hóa đơn */}
        <button className="print-button" onClick={handlePrintInvoice}>
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default TicketForm;
