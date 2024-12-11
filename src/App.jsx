import React from 'react'
import NavBar_1 from './components/NavBar_1/NavBar_1.jsx'
import HomePage from './screens/HomePage/HomePage.jsx'
import LoginPage from './screens/LoginPage/LoginPage.jsx'
import SignUpPage from './screens/SignUpPage/SignUpPage.jsx'
import FlightPage from './screens/FlightPage/FlightPage.jsx'
import BookingPage from './screens/BookingPage/BookingPage.jsx'
import TicketPage from './screens/TicketPage/TicketPage.jsx'


import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer.jsx'

// import { FlightSearchPage } from './screens/FlightSearch/FlightSearchPage.jsx'

function App() {
  return (
    <>
      <div className="app">
        <NavBar_1 />
        <Routes>
          {/* <Route path="/" element={<TicketPage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/flight" element={<FlightPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/tickets" element={<TicketPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
