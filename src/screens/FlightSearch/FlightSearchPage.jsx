import React from 'react'
import './FlightSearchPage.css'

import { FlightFilter } from '../../screens/FlightSearch/FlightFilter/FlightFilter.jsx';
import FlightResultPage from '../../screens/FlightSearch/FlightResult/FlightResultPage.jsx';


export const FlightSearchPage = () => {
    const searchParams = {
        departureAirportCode: "SGN",      // Mã sân bay khởi hành (SGN: Tan Son Nhat)
        arrivalAirportCode: "HAN",        // Mã sân bay đến (HAN: Noi Bai)
        departDate: "2024-12-05",         // Ngày khởi hành
        class: "economy",                 // Loại ghế (economy, business, firstClass)
        passengers: 2                     // Số hành khách
    };


    return (
        <div>
            <main className="main">

                <section className="flight-search-box">
                    <div className='searchbox'>
                        <h1>Search flight form</h1>
                    </div>

                </section>

                <section className="flight-search-results">
                    {/* <div className="flight-search-results-filter">
                        <FlightFilter />
                    </div> */}

                    <div className="flight-search-results-result">

                        <FlightResultPage searchParams={searchParams} />
                        {/* <FlightResultCard /> */}
                    </div>
                </section>
            </main>
        </div>
    )
}