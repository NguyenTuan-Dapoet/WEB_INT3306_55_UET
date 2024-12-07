import React from 'react'   
// import NavBar from '../../components/NavBar/NavBar.jsx'
// import SearchForm from '../../components/SearchForm/SearchForm.jsx'
// import PassengerClassSelect from '../../components/PassengerClassSelect/PassengerClassSelect.jsx'
// import DateRangeComp from '../../components/DateSelect/DateRangeComp.jsx'
// import NavBar_1 from '../../components/NavBar_1/NavBar_1.jsx'
import './Home.css'
import Header from '../../components/Header/Header.jsx'
import FlightDisplay from '../../components/FlightDisplay/FlightDisplay.jsx'
import TestForm from '../../components/TestCompose/TestForm.jsx'
import TripForm from '../../components/TripForm/TripForm.jsx'
function Home() {
    return (
        <div>
            <Header />
            {/* <SearchForm/> */}
            {/* <TestForm/> */}
            <TripForm/>
            <FlightDisplay/>
        </div>
    )
}

export default Home 