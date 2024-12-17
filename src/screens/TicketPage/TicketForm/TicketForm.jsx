// import React from "react";
// import "./TicketForm.css";
// import { PiAirplaneInFlightLight } from "react-icons/pi";
// import DateTimeComponent from "../../../components/DateSelect/formatDateTime";

// const TicketForm = ({ ticket }) => {
//     const handlePrintInvoice = () => {
//         window.open(`http://localhost:8080/pdf/${ticket.pdfs}`, "_blank");
//     }

//     return (
//         <div className="ticket">
//             <div className="ticket-left">
//                 <div className="ticket-left-header">
//                     <p>BOARDING PASS</p>
//                 </div>

//                 <div className="content">
//                     <div className="section-from">
//                         <p className="section-label">FROM:</p>
//                         <div className="section-details">
//                             <span className="airport-code">{ticket.originCode}</span>
//                             <span className="city">{ticket.originName}</span>

//                             <div className="date-time">
//                                 <DateTimeComponent departureTime={ticket.departureTime} />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="plane-icon-ticket">
//                         <PiAirplaneInFlightLight />
//                     </div>

//                     <div className="section-to">
//                         <p className="section-label">TO:</p>
//                         <div className="section-details">
//                             <span className="airport-code">{ticket.destinationCode}</span>
//                             <span className="city">{ticket.destinationName}</span>
//                             <div className="date-time">
//                                 <DateTimeComponent departureTime={ticket.arrivalTime} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="info">
//                     <div className="info-section">
//                         <span>Passenger Name: </span>
//                         <span>{ticket.flightNumber}</span>
//                     </div>

//                     <div className="info-section">
//                         <span>Flight: </span>
//                         <span>{ticket.aircraftCode}</span>
//                     </div>

//                     <div className="info-section">
//                         <span>Class: </span>
//                         <span>{ticket.ticketClass}</span>
//                     </div>

//                     <div className="info-section">
//                         <span>Seat: </span>
//                         <span>trống</span>
//                     </div>

//                 </div>
//             </div>

//             <div className="ticket-divider"></div>

//             <div className="ticket-right">
//                 <div className="ticket-right-header">
//                     <p>BOARDING <br /> PASS</p>
//                 </div>

//                 {/* Thêm phần trạng thái */}
//                 <div className="ticket-status">
//                     <span>Status: </span>
//                     <span
//                         className={`status ${ticket.status === "accept" ? "status-accept" : "status-pending"}`}
//                     >
//                         {ticket.status}
//                     </span>
//                 </div>
                
//                 {/* Nút bấm in hóa đơn */}
//                 <button className="print-button" onClick={handlePrintInvoice}>
//                     Print Invoice
//                 </button>

//             </div>
//         </div>
//     );
// };

// export default TicketForm;

import React, { useState, useEffect } from "react";
import "./TicketForm.css";
import { PiAirplaneInFlightLight } from "react-icons/pi";
import DateTimeComponent from "../../../components/DateSelect/formatDateTime";

const TicketForm = ({ ticket, createAt }) => {
  const [status, setStatus] = useState(ticket.status); // Trạng thái ban đầu
  const [timeLeft, setTimeLeft] = useState(60); // Bộ đếm thời gian mặc định là 60 giây
  const [cancelEnabled, setCancelEnabled] = useState(true);

//   Thời gian đã tạo (hard data)
//   const createAt = "2024-12-17 15:28:12.217419";
  const countTime = 60 * 10;

  useEffect(() => {
    // Tính thời gian kết thúc = createAt + 1 phút
    const endTime = new Date(new Date(createAt).getTime() + countTime * 1000);

    const updateTimer = () => {
      const now = new Date();
      const remainingTime = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(remainingTime);

      // Hết giờ thì vô hiệu hóa nút Cancel
      if (remainingTime === 0) {
        setCancelEnabled(false);
      }
      console.log(remainingTime);
    };

    // Cập nhật bộ đếm mỗi giây
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Chạy lần đầu tiên

    return () => clearInterval(timerInterval); // Cleanup interval khi unmount
  }, [createAt]);

  const handleCancelTicket = () => {
    setStatus("Cancel"); // Đặt trạng thái là "cancel"
    setCancelEnabled(false); // Vô hiệu hóa nút Cancel
  };

  const handlePrintInvoice = () => {
    window.open(`http://localhost:8080/pdf/${ticket.pdfs}`, "_blank");
  };

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
      </div>

      <div className="ticket-divider"></div>

      <div className="ticket-right">
        <div className="ticket-right-header">
          <p>BOARDING <br /> PASS</p>
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
