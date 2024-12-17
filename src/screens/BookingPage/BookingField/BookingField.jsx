import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector để lấy dữ liệu từ Redux
import { BookingContext } from '../../../assets/api/BookingProvider.jsx';
import { UserInfoContext } from '../../../assets/api/UserInfoProvider.jsx';
import { FlightCard } from '../../FlightPage/FlightCard/FlightCard.jsx';
import { LoadingState } from '../../../components/LoadingState/LoadingState.jsx';
import PassengerClassSelect from '../../../components/PassengerClassSelect/PassengerClassSelect.jsx';
import CalendarComp from '../../../components/DateSelect/CalendarComp.jsx'
import './BookingField.css';

const BookingField = () => {
    const selectedFlight = JSON.parse(localStorage.getItem("selectedFlight"));
    const token = localStorage.getItem('app_token');
    const { userInfo } = useContext(UserInfoContext);
    const { createBooking, loading, error, bookingResponse } = useContext(BookingContext);

    // Lấy dữ liệu hành khách từ Redux
    const passengers = useSelector((state) => state.trip.passengers);

    if (!selectedFlight || !userInfo) {
        return <p>No flight or user selected. Please go back and try again.</p>;
    }

    const [name, setName] = useState({
        firstAndMiddleName: '',
        lastName: '',
        dateOfBirth: '',
        passengerName: '',
        email: '',
        phoneNumber: '',
        ticketClass: '',
    });

    const [bookingData, setBookingData] = useState({
        title: '',
        passengerName: '',
        email: '',
        phoneNumber: '',
        totalPrices: selectedFlight.price,
        totalPeople: passengers.adult + passengers.children, // Lấy từ Redux
        ticketClass: passengers.classType, // Lấy từ Redux
    });

    console.log("bookingData", bookingData);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setBookingData({
    //         ...bookingData,
    //         [name]: value,
    //     });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Cập nhật state name tạm thời
        setName((prev) => {
            const updatedName = { ...prev, [name]: value };

            // Tạo passengerName từ lastName và firstAndMiddleName nếu cần
            const passengerName = `${updatedName.lastName} ${updatedName.firstAndMiddleName}`.trim();

            // Cập nhật bookingData đồng thời
            setBookingData((prevBookingData) => ({
                ...prevBookingData,
                [name]: value, // Cập nhật giá trị cho các trường khác (email, phoneNumber, v.v.)
                ...(name === 'lastName' || name === 'firstAndMiddleName' ? { passengerName } : {}), // Chỉ cập nhật passengerName khi lastName hoặc firstAndMiddleName thay đổi
            }));

            return updatedName;
        });
    };

    const handleSubmit = () => {
        // Cập nhật lại totalPeople và totalPrices từ Redux trước khi gửi
        const full_name = bookingData.firstAndMiddleName + ' ' + bookingData.lastName;

        const updatedBookingData = {
            ...bookingData,
            totalPrices: (passengers.adult + passengers.children * 0.5) * selectedFlight.price, // trẻ em giảm 50%
            passengerName: full_name,
        };

        createBooking(userInfo.id, selectedFlight.flightId, token, updatedBookingData);
    };

    return (
        <div className='booking-field-background'>
            {loading ? (
                <div className='booking-field-loading'>
                    <LoadingState />
                </div>
            ) : (
                <div className='booking-field-price'>
                    <div className='booking-field'>
                        <div className="booking-field-container">
                            <div className='booking-detail'>
                                <h3>Flight Details</h3>
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

                            <div className="passenger-detail">
                                <h3>Passenger Information</h3>

                                <div className="booking-form">
                                    <div className="booking-form-title">
                                        <h4>Adult 1</h4>
                                    </div>
                                    <div className='booking-form-detail'>
                                        <label> Title
                                            <select
                                                name="title"
                                                value={bookingData.title}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="Mr">Mr</option>
                                                <option value="Mrs">Mrs</option>
                                                <option value="Ms">Ms</option>
                                            </select>
                                        </label>

                                        <label>
                                            <p>Last Name (e.g. Nguyen):</p>
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Without title and punctuation"
                                                value={bookingData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>

                                        {/* Middle & First Name */}
                                        <label>
                                            <p>Middle & First Name (e.g. Thi Ngoc Anh):</p>
                                            <input
                                                type="text"
                                                name="firstAndMiddleName"
                                                placeholder="Without title and punctuation"
                                                value={bookingData.firstAndMiddleName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </label>

                                        {/* Date of Birth */}
                                        <label>
                                            <p>Date of Birth:</p>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={bookingData.dateOfBirth}
                                                onChange={handleChange}
                                                required
                                            />
                                            {/* sửa calender giống trong trip compose */}
                                            {/* <CalendarComp /> */}
                                        </label>

                                        {/* <label>
                                    <p>Your name:</p>
                                    <input
                                        type="text"
                                        name="passengerName"
                                        value={bookingData.passengerName}
                                        onChange={handleChange}
                                    />
                                </label> */}
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
                                </div>
                            </div>

                            <div className='booking-submit'>
                                <button onClick={handleSubmit} disabled={loading} className='booking-submit-button'>
                                    {loading ? 'Booking...' : 'Confirm Booking'}
                                </button>

                                {error && <p className="error-message">{error}</p>}
                                {bookingResponse && <p className="success-message">Booking Successful! ID: {bookingResponse}</p>}
                            </div>
                        </div>
                    </div>

                    <div className='booking-price-container'>
                        <p>Please make your payment within the next <strong>20 minutes</strong> to keep this session active.</p>
                        <div className='price-details'>
                            <h3 className='price-details-header'>Price Details (VND)</h3>
                            <div className='price-details-item'>
                                <ul>
                                    <li>
                                        <span>Travelers</span>
                                        <span>Subtotal</span>
                                    </li>
                                    <li>
                                        <span>{passengers.adult} Adult</span>
                                        <span>{passengers.adult * selectedFlight.price} VND</span>
                                    </li>
                                    {passengers.children > 0 &&
                                        <li>
                                            <span>{passengers.children} Children</span>
                                            <span>{passengers.children * selectedFlight.price * 0.5} VND</span>
                                        </li>
                                    }
                                </ul>
                                <div className='total-price'>
                                    <h4>Total Price: </h4>
                                    <span>{bookingData.totalPrices} VND</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='booking-submit-second'>
                        <button onClick={handleSubmit} disabled={loading} className='booking-submit-button'>
                            {loading ? 'Booking...' : 'Confirm Booking'}
                        </button>

                        {error && <p className="error-message">{error}</p>}
                        {bookingResponse && <p className="success-message">Booking Successful! ID: {bookingResponse}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingField;
