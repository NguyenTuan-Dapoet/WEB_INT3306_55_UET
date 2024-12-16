import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector để lấy dữ liệu từ Redux
import { BookingContext } from '../../../assets/api/BookingProvider.jsx';
import { UserInfoContext } from '../../../assets/api/UserInfoProvider.jsx';
import { FlightCard } from '../../FlightPage/FlightCard/FlightCard.jsx';
import { LoadingState } from '../../../components/LoadingState/LoadingState.jsx';
import PassengerClassSelect from '../../../components/PassengerClassSelect/PassengerClassSelect.jsx';
import './BookingFeild.css';

const BookingFeild = () => {
    const selectedFlight = JSON.parse(localStorage.getItem("selectedFlight"));
    const token = localStorage.getItem('app_token');
    const { userInfo } = useContext(UserInfoContext);
    const { createBooking, loading, error, bookingResponse } = useContext(BookingContext);

    // Lấy dữ liệu hành khách từ Redux
    const passengers = useSelector((state) => state.trip.passengers);

    if (!selectedFlight || !userInfo) {
        return <p>No flight or user selected. Please go back and try again.</p>;
    }

    const [bookingData, setBookingData] = useState({
        passengerName: '',
        email: '',
        phoneNumber: '',
        totalPrices: selectedFlight.price,
        totalPeople: passengers.adult + passengers.children, // Lấy từ Redux
        ticketClass: passengers.classType, // Lấy từ Redux
    });

    console.log("bookingData",bookingData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData({
            ...bookingData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        // Cập nhật lại totalPeople và totalPrices từ Redux trước khi gửi
        const updatedBookingData = {
            ...bookingData,
            totalPrices: (passengers.adult + passengers.children * 0.5) * selectedFlight.price, // trẻ em giảm 50%
        };

        createBooking(userInfo.id, selectedFlight.flightId, token, updatedBookingData);
    };

    return (
        <div className='booking-feild-background'>
            {loading ? (
                <div className='booking-feild-loading'>
                    <LoadingState />
                </div>
            ) : (
                <div className="booking-feild-container">
                    <div className='booking-detail'>
                        <FlightCard
                            flightNumber={selectedFlight.flightNumber}
                            origin={selectedFlight.origin.locationName}
                            destination={selectedFlight.destination.locationName}
                            departure={selectedFlight.departureTime}
                            arrival={selectedFlight.arrivalTime}
                            price={selectedFlight.price}
                            availableSeats={selectedFlight.availableSeats}
                        />
                    </div>

                    <h3>Passenger Information</h3>

                    <div className="booking-form">
                        <label>
                            <p>Your name:</p>
                            <input
                                type="text"
                                name="passengerName"
                                value={bookingData.passengerName}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <p>Email:</p>
                            <input
                                type="email"
                                name="email"
                                value={bookingData.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <p>Phone number:</p>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={bookingData.phoneNumber}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            <p>Passenger select:</p>
                            <div className="book-passenger">
                                <PassengerClassSelect />
                            </div>
                        </label>
                    </div>
                    <button onClick={handleSubmit} disabled={loading} className='booking-submit-button'>
                        {loading ? 'Booking...' : 'Confirm Booking'}
                    </button>

                    {error && <p className="error-message">{error}</p>}
                    {bookingResponse && <p className="success-message">Booking Successful! ID: {bookingResponse}</p>}
                </div>
            )}
        </div>
    );
};

export default BookingFeild;
