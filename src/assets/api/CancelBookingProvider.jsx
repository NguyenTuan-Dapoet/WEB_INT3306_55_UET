import React, { createContext, useState } from 'react';

// Tạo context cho việc hủy booking
const CancelBookingContext = createContext();

function CancelBookingProvider({ children }) {
  const [cancelResponse, setCancelResponse] = useState(null); // Lưu phản hồi khi hủy booking
  const [error, setError] = useState(null);                   // Lưu thông báo lỗi
  const [loading, setLoading] = useState(false);              // Trạng thái loading

  // Hàm hủy booking qua API
  const cancelBooking = async (bookingId, token) => {
    setLoading(true);   // Bắt đầu loading
    setError(null);     // Reset lỗi trước đó
    setCancelResponse(null); // Reset phản hồi trước đó

    try {
      const response = await fetch(`http://localhost:8080/bookings/cancelBooking/${bookingId}`, {
        method: 'PUT', // PUT request
        headers: {
          'Content-Type': 'application/json', // Kiểu dữ liệu gửi lên
          'Authorization': `Bearer ${token}`, // Thêm token vào header
        },
      });

      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
      }

      const data = await response.text(); // Chuyển phản hồi thành JSON
      setCancelResponse(data);  // Lưu phản hồi thành công từ server
    } catch (error) {
      console.error('Có lỗi khi hủy booking:', error);
      setError('Không thể hủy booking. Vui lòng thử lại.'); // Lưu thông báo lỗi
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  // Trả về component Provider
  return (
    <CancelBookingContext.Provider value={{ cancelResponse, error, loading, cancelBooking }}>
      {children}
    </CancelBookingContext.Provider>
  );
}

export { CancelBookingContext, CancelBookingProvider };
