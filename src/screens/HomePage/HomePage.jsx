import React from 'react'
import './HomePage.css'
import Header from '../../components/Header/Header.jsx'
// import FlightDisplay from './FlightDisplay/FlightDisplay.jsx'
import TripForm from '../../components/TripForm/TripForm.jsx'
import { VideoHeader } from './VideoHeader/VideoHeader.jsx'
import News from './News/News.jsx'
import SwiperSlider from '../../components/SwiperSlider/SwiperSlider.jsx'
import WhyChooseUs from './WhyChooseUs/WhyChooseUs.jsx'
import ClientReviews from './ClientReviews/ClientReviews.jsx'
import FAQSection from './FAQSection/FAQSection.jsx'
import Error from '../../components/Error/Error.jsx'

function Home() {
    return (
        <div className='homepage'>
            <Header />
            <TripForm />
            <VideoHeader />
            <News />
            {/* <FlightDisplay/> */}
            <SwiperSlider />
            <WhyChooseUs />
            <ClientReviews />
            <FAQSection />
            {/* <Error/> */}
        </div>
    )
}

export default Home 