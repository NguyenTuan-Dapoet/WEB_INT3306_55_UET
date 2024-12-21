import { React, useState, useEffect, useContext } from "react";
import "./TicketForm.css";
import { IoAirplane } from "react-icons/io5";
import verticalBarcode from "../../../assets/icons/vertical-barcode.gif";
import { CancelBookingContext } from '../../../assets/api/CancelBookingProvider';
import { el } from "date-fns/locale";
import LoadingState from "../../../components/LoadingState/LoadingState";
import { formatDateTime } from "../../../components/DateSelect/formatDateTime";

const TicketForm = ({ ticket, onCancelSuccess }) => {
  const { cancelBooking, loading } = useContext(CancelBookingContext);
  const [boardingTime, setBoardingTime] = useState('');

  const [timeLeft, setTimeLeft] = useState(60); // Bộ đếm thời gian mặc định là 60 giây
  const [cancelEnabled, setCancelEnabled] = useState(true);

  const token = localStorage.getItem('app_token');
  const createAt = ticket.createdAt;
  const countTime = 60 * 10;  // 10 phút đém ngược

  const { formattedDate, formattedTime } = formatDateTime(ticket.departureTime);
  // console.log("test", formattedDate, formattedTime);

  useEffect(() => {
    // Tính thời gian kết thúc = createAt + 10 phút
    const endTime = new Date(new Date(createAt).getTime() + countTime * 1000);
    const updateTimer = () => {
      const now = new Date();
      const remainingTime = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(remainingTime);
      // Hết giờ thì vô hiệu hóa nút Cancel
      if (remainingTime === 0 || ticket.status !== 'PENDING') {
        setCancelEnabled(false);
      }
      // console.log(remainingTime);
    };
    // Cập nhật bộ đếm mỗi giây
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Chạy lần đầu tiên
    return () => clearInterval(timerInterval); // Cleanup interval khi unmount
  }, [createAt, ticket.status]);
  

  const handleCancelTicket = () => {
    if (ticket.bookingId && token) {
      cancelBooking(ticket.bookingId, token); // Gọi hàm với bookingId và token
      onCancelSuccess();
    } else {
      alert("Please enter your Booking ID and make sure you are logged in!");
    }
  };

  const handlePrintInvoice = () => {
    window.open(`http://localhost:8080/pdf/${ticket.pdfs}`, "_blank");
  };

  return (
    // loading ? (
    //   <LoadingState />
    // ) : (
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
            <div className="section-details">
              <span className="airport-code">{ticket.originCode}</span>
              <span className="city">{ticket.originName}</span>
            </div>
          </div>

          <div className="plane-icon-ticket">
            <IoAirplane />
          </div>

          <div className="section-to">
            <div className="section-details">
              <span className="airport-code">{ticket.destinationCode}</span>
              <span className="city">{ticket.destinationName}</span>
            </div>
          </div>
        </div>

        <div className="info-section-row">
          <span>Booking number: </span>
          <span>{ticket.bookingNumber}</span>
        </div>

      </div>

      <div className="ticket-divider"></div>

      <div className="ticket-right">
        <div className="ticket-right-header">
          <p>BOARDING PASS</p>
        </div>

        <div className="ticket-right-content">
          <p>{ticket.ticketClass}</p>
          <p>{ticket.passengerName}</p>
          <p>{ticket.originCode} - {ticket.destinationCode}</p>
          <p>{ticket.flightNumber}</p>
          <p>{formattedDate}</p>
        </div>

        <div className="ticket-status">
          <span>Status: </span>
          <span
            className={`status ${ticket.status === "CONFIRMED"
              ? "status-confirmed"
              : ticket.status === "CANCELLED"
                ? "status-cancelled"
                : "status-pending"
              }`}
          >
            {ticket.status}
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
          disabled={!cancelEnabled || loading}
        >
          Cancel Ticket
        </button>

        {/* Nút in hóa đơn */}
        <button className="print-button" onClick={handlePrintInvoice}>
          Print Invoice
        </button>
      </div>
    </div>
  )
  // );
}


export default TicketForm;
