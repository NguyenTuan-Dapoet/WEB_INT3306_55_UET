// // BookingPage.js
// import React, { createContext, useContext, useState } from 'react';
// import { BookingContext } from '../../assets/api/BookingProvider';
// import { UserInfoContext } from '../../assets/api/UserInfoProvider';
// import { FlightCard } from '../FlightPage/FlightCard/FlightCard';
// import './BookingPage.css';


// const BookingPage = () => {
//     const selectedFlight = JSON.parse(localStorage.getItem("selectedFlight"));
//     const token = localStorage.getItem('app_token');
//     const { userInfo } = useContext(UserInfoContext);
//     const { createBooking, loading, error, bookingResponse } = useContext(BookingContext);
//     if (!selectedFlight) {
//         return <p>No flight selected. Please go back and choose a flight.</p>;
//     }

//     const [bookingData, setBookingData] = useState({
//         passengerName: '',
//         email: '',
//         phoneNumber: '',
//         totalPrices: selectedFlight ? selectedFlight.price : 0,
//         totalPeople: 1,
//     });

//     if (!selectedFlight || !userInfo) {
//         return <p>No flight or user selected. Please go back and try again.</p>;
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setBookingData({ 
//             ...bookingData, 
//             [name]: value,
//             totalPrices: name === 'totalPeople' ? value * selectedFlight.price : bookingData.totalPrices // Cập nhật giá vé khi thay đổi số lượng người
//         });
//     };

//     const handleSubmit = () => {
//         createBooking(userInfo.id, selectedFlight.flightId, token, bookingData);
//     };

//     // console.log("bookingResponse", bookingResponse);
//     // console.log("error", error);

//     return (
//         <div className='booking-page-background'>
//             <div className="booking-page-container">
//                 <div className='booking-detail'>
//                     <FlightCard 
//                     flightNumber= {selectedFlight.flightNumber}
//                     origin= {selectedFlight.origin.locationName}
//                     destination={selectedFlight.destination.locationName}
//                     departure={selectedFlight.departureTime}
//                     arrival= {selectedFlight.arrivalTime}
//                     price={selectedFlight.price}
//                     availableSeats={selectedFlight.availableSeats}
//                   />
//                 </div>
                
//                 <h3>Passenger Information</h3>

//                 <div className="booking-form">
//                     <label>
//                         Name:
//                         <input
//                             type="text"
//                             name="passengerName"
//                             value={bookingData.passengerName}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label>
//                         Email:
//                         <input
//                             type="email"
//                             name="email"
//                             value={bookingData.email}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label>
//                         Phone Number:
//                         <input
//                             type="text"
//                             name="phoneNumber"
//                             value={bookingData.phoneNumber}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label>
//                         Total People:
//                         <input
//                             type="number"
//                             name="totalPeople"
//                             value={bookingData.totalPeople}
//                             onChange={handleChange}
//                         />
//                     </label>
//                 </div>
//                 <button onClick={handleSubmit} disabled={loading} className='booking-submit-button'>
//                     {loading ? 'Booking...' : 'Confirm Booking'}
//                 </button>
                
//                 {error && <p className="error-message">{error}</p>}
//                 {bookingResponse && <p className="success-message">Booking Successful! ID: {bookingResponse.bookingId}</p>}
//             </div>
//         </div>
//     );
// };

// export default BookingPage;


import React from 'react'   
import BookingFeild from './BookingField/BookingFeild'
import "./BookingPage.css"
function Home() {
    return (
        <div className='booking-page-backround'>
            <BookingFeild/>
        </div>
    )
}

export default Home 