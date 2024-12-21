import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BookingContext } from '../../../assets/api/BookingProvider.jsx';
import { UserInfoContext } from '../../../assets/api/UserInfoProvider.jsx';
import { FlightCard } from '../../FlightPage/FlightCard/FlightCard.jsx';
import { LoadingState } from '../../../components/LoadingState/LoadingState.jsx';
import PassengerClassSelect from '../../../components/PassengerClassSelect/PassengerClassSelect.jsx';
import CalendarComp from '../../../components/DateSelect/CalendarComp.jsx';
import './BookingField.css';
import { convertToDateInputFormat } from '../../../components/DateSelect/formatDateTime.jsx';
import PopUp from '../../../components/PopUp/PopUp.jsx';
import TicketPopUp from '../TicketPopUp/TicketPopUp.jsx';


const BookingField = () => {
    const selectedFlight = JSON.parse(localStorage.getItem("selectedFlight"));
    const token = localStorage.getItem('app_token');
    const { userInfo } = useContext(UserInfoContext);
    const { createBooking, loading, error, setError, bookingResponse, setBookingResponse } = useContext(BookingContext);

    // Lấy dữ liệu hành khách từ Redux
    const passengers = useSelector((state) => state.trip.passengers);
    const birthDate = useSelector((state) => state.trip.startDate);
    if (!selectedFlight || !userInfo) {
        return <p>No flight or user selected. Please go back and try again.</p>;
    }

    const [human, setHuman] = useState({
        title: 'Mr',
        firstAndMiddleName: '',
        lastName: 'Mr. ',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
    });

    const [bookingData, setBookingData] = useState({
        passengerName: '',
        email: '',
        phoneNumber: '',
        totalPrices: '',
        totalPeople: '',
        ticketClass: '',
    });

    // console.log("passengers", passengers);
    console.log("human", human);
    console.log("bookingData", bookingData);
    console.log("........bookingresonse", bookingResponse);

    // console.log("birthDate", birthDate);
    // console.log("dateOfBirth", human.dateOfBirth);

    useEffect(() => {
        // Cập nhật lại bookingData khi passengers thay đổi
        const updatedBookingData = {
            passengerName: `${human.lastName} ${human.firstAndMiddleName}`,
            email: human.email,
            phoneNumber: human.phoneNumber,
            totalPrices: (passengers.adult + passengers.children * 0.5) * selectedFlight.price,
            totalPeople: passengers.adult + passengers.children,
            ticketClass: passengers.classType
        };

        setBookingResponse(null)
        setBookingData(updatedBookingData);
    }, [passengers, human]); // Chạy lại khi passengers hoặc human thay đổi

    const handleChange = (e) => {
        const { name, value } = e.target;

        setHuman((prev) => {
            const updatedHuman = { ...prev, [name]: value };

            // Khi thay đổi title, cập nhật lại lastName
            if (name === 'title') {
                updatedHuman.lastName = '';
                updatedHuman.lastName = `${value}. ${updatedHuman.lastName}`;
            }

            updatedHuman.dateOfBirth = convertToDateInputFormat(birthDate); // Chuyển đổi định dạng
            return updatedHuman;
        });
    };

    const handleSubmit = () => {
        // const full_name = human.lastName + ' ' + human.firstAndMiddleName;

        // const updatedBookingData = {
        //     ...bookingData,
        //     passengerName: full_name
        // };

        console.log("updatedBookingData", bookingData);
        createBooking(userInfo.id, selectedFlight.flightId, token, bookingData);

        setHuman({
            title: 'Mr',
            firstAndMiddleName: '',
            lastName: 'Mr. ',
            dateOfBirth: '',
            email: '',
            phoneNumber: '',
        });

        setBookingData({
            passengerName: '',
            email: '',
            phoneNumber: '',
            totalPrices: '',
            totalPeople: '',
            ticketClass: '',
        });

        setError(null);
        setBookingResponse(null);
    };

    return (
        loading ? (
            <div className='booking-field-loading'>
                <LoadingState />
            </div>
        ) : (
            <div className='booking-field-background'>
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

                                <form onSubmit={handleSubmit}>
                                    <div className="booking-form">
                                        {/* <div className="booking-form-title">
                                            <h4>Adult 1</h4>
                                        </div> */}
                                        <div className='booking-form-detail'>
                                            <label> Title
                                                <select
                                                    name="title"
                                                    value={human.title}
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
                                                    value={human.lastName}
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
                                                    value={human.firstAndMiddleName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </label>
                                            <label>
                                                <p>Phone number:</p>
                                                <input
                                                    type="text"
                                                    name="phoneNumber"
                                                    value={human.phoneNumber}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </label>
                                            <div className='birth-phone'>
                                                <label>
                                                    <p>Date of Birth:</p>
                                                    <div
                                                        className="date-container"
                                                        name="dateOfBirth"
                                                    >
                                                        <CalendarComp />
                                                    </div>
                                                </label>
                                                <label>
                                                    <p>Email:</p>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={human.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </label>
                                            </div>
                                            <label>
                                                <p>Passenger select:</p>
                                                <div className="book-passenger">
                                                    <PassengerClassSelect />
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className='booking-submit'>
                                        {/* <button onClick={handleSubmit} disabled={loading} className='booking-submit-button'> */}
                                        <button type="submit" disabled={loading} className='booking-submit-button'>
                                            {loading ? 'Booking...' : 'Confirm Booking'}
                                        </button>

                                        {error && <p className="error-message">{error}</p>}
                                        {/* {bookingResponse && <p className="success-message">Booking Successful!: {bookingResponse}</p>} */}
                                        {bookingResponse && <TicketPopUp/>}
                                    </div>
                                </form>
                            </div>

                            {/* <div className='booking-submit'>
                                <button onClick={handleSubmit} disabled={loading} className='booking-submit-button'>
                                    {loading ? 'Booking...' : 'Confirm Booking'}
                                </button>

                                {error && <p className="error-message">{error}</p>}
                                {bookingResponse && <p className="success-message">Booking Successful! ID: {bookingResponse}</p>}
                            </div> */}
                        </div>
                    </div>

                    <div className='booking-price-container'>
                        <p>Please make your payment within the next <strong>20 minutes</strong> to keep this session active.</p>
                        <div className='price-details'>
                            <h3 className='price-details-header'>Price Details (USD)</h3>
                            <div className='price-details-item'>
                                <ul>
                                    <li>
                                        <span>Travelers</span>
                                        <span>Subtotal</span>
                                    </li>
                                    <li>
                                        <span>{passengers.adult} Adult</span>
                                        <span>USD {passengers.adult * selectedFlight.price}</span>
                                    </li>
                                    {passengers.children > 0 &&
                                        <li>
                                            <span>{passengers.children} Children</span>
                                            <span>USD {passengers.children * selectedFlight.price * 0.5}</span>
                                        </li>
                                    }
                                </ul>
                                <div className='total-price'>
                                    <h4>Total Price: </h4>
                                    <span>USD {bookingData.totalPrices}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='booking-submit-second'>
                        <button onClick={handleSubmit} disabled={loading} className='booking-submit-button'>
                            {loading ? 'Booking...' : 'Confirm Booking'}
                        </button>

                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </div>
        )
    )

    // <div className='booking-field-background'>
    //     {loading ? (
    //         <div className='booking-field-loading'>
    //             <LoadingState />
    //         </div>
    //     ) : (
    //         <div className='booking-field-price'>
    //             <div className='booking-field'>
    //                 <div className="booking-field-container">
    //                     <div className='booking-detail'>
    //                         <h3>Flight Details</h3>
    //                         <FlightCard
    //                             flightNumber={selectedFlight.flightNumber}
    //                             origin={selectedFlight.origin.locationName}
    //                             destination={selectedFlight.destination.locationName}
    //                             departure={selectedFlight.departureTime}
    //                             arrival={selectedFlight.arrivalTime}
    //                             price={selectedFlight.price}
    //                             availableSeats={selectedFlight.availableSeats}
    //                         />
    //                     </div>

    //                     <div className="passenger-detail">
    //                         <h3>Passenger Information</h3>

    //                         <div className="booking-form">
    //                             <div className="booking-form-title">
    //                                 <h4>Adult 1</h4>
    //                             </div>
    //                             <div className='booking-form-detail'>
    //                                 <label> Title
    //                                     <select
    //                                         name="title"
    //                                         value={human.title}
    //                                         onChange={handleChange}
    //                                         required
    //                                     >
    //                                         <option value="Mr">Mr</option>
    //                                         <option value="Mrs">Mrs</option>
    //                                         <option value="Ms">Ms</option>
    //                                     </select>
    //                                 </label>

    //                                 <label>
    //                                     <p>Last Name (e.g. Nguyen):</p>
    //                                     <input
    //                                         type="text"
    //                                         name="lastName"
    //                                         placeholder="Without title and punctuation"
    //                                         value={human.lastName}
    //                                         onChange={handleChange}
    //                                         required
    //                                     />
    //                                 </label>

    //                                 {/* Middle & First Name */}
    //                                 <label>
    //                                     <p>Middle & First Name (e.g. Thi Ngoc Anh):</p>
    //                                     <input
    //                                         type="text"
    //                                         name="firstAndMiddleName"
    //                                         placeholder="Without title and punctuation"
    //                                         value={human.firstAndMiddleName}
    //                                         onChange={handleChange}
    //                                         required
    //                                     />
    //                                 </label>

    //                                 {/* Date of Birth */}
    //                                 <label>
    //                                     <p>Date of Birth:</p>
    //                                     <input
    //                                         type="date"
    //                                         name="dateOfBirth"
    //                                         value={human.dateOfBirth}
    //                                         onChange={handleChange}
    //                                         required
    //                                     />
    //                                 </label>

    //                                 <label>
    //                                     <p>Email:</p>
    //                                     <input
    //                                         type="email"
    //                                         name="email"
    //                                         value={human.email}
    //                                         onChange={handleChange}
    //                                     />
    //                                 </label>
    //                                 <label>
    //                                     <p>Phone number:</p>
    //                                     <input
    //                                         type="text"
    //                                         name="phoneNumber"
    //                                         value={human.phoneNumber}
    //                                         onChange={handleChange}
    //                                     />
    //                                 </label>

    //                                 <label>
    //                                     <p>Passenger select:</p>
    //                                     <div className="book-passenger">
    //                                         <PassengerClassSelect />
    //                                     </div>
    //                                 </label>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div className='booking-submit'>
    //                         <button onClick={handleSubmit} disabled={loading} className='booking-submit-button'>
    //                             {loading ? 'Booking...' : 'Confirm Booking'}
    //                         </button>

    //                         {error && <p className="error-message">{error}</p>}
    //                         {bookingResponse && <p className="success-message">Booking Successful! ID: {bookingResponse}</p>}
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className='booking-price-container'>
    //                 <p>Please make your payment within the next <strong>20 minutes</strong> to keep this session active.</p>
    //                 <div className='price-details'>
    //                     <h3 className='price-details-header'>Price Details (VND)</h3>
    //                     <div className='price-details-item'>
    //                         <ul>
    //                             <li>
    //                                 <span>Travelers</span>
    //                                 <span>Subtotal</span>
    //                             </li>
    //                             <li>
    //                                 <span>{passengers.adult} Adult</span>
    //                                 <span>{passengers.adult * selectedFlight.price} VND</span>
    //                             </li>
    //                             {passengers.children > 0 &&
    //                                 <li>
    //                                     <span>{passengers.children} Children</span>
    //                                     <span>{passengers.children * selectedFlight.price * 0.5} VND</span>
    //                                 </li>
    //                             }
    //                         </ul>
    //                         <div className='total-price'>
    //                             <h4>Total Price: </h4>
    //                             <span>{bookingData.totalPrices} VND</span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className='booking-submit-second'>
    //                 <button onClick={handleSubmit} disabled={loading} className='booking-submit-button'>
    //                     {loading ? 'Booking...' : 'Confirm Booking'}
    //                 </button>

    //                 {error && <p className="error-message">{error}</p>}
    //                 {bookingResponse && <p className="success-message">Booking Successful! ID: {bookingResponse}</p>}
    //             </div>
    //         </div>
    //     )}
    // </div>

};

export default BookingField;
