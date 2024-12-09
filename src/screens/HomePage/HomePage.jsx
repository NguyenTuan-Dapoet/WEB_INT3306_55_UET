import React from 'react'   
import './HomePage.css'
import Header from '../../components/Header/Header.jsx'
import FlightDisplay from './FlightDisplay/FlightDisplay.jsx'
import TripForm from '../../components/TripForm/TripForm.jsx'
function Home() {
    return (
        <div>
            <Header />
            <TripForm/>
            <FlightDisplay/>
        </div>
    )
}

export default Home 