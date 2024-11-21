import React from 'react'   
import NavBar from '../../components/NavBar/NavBar.jsx'
import SearchForm from '../../components/SearchForm/SearchForm.jsx'
import PassengerClassSelect from '../../components/PassengerClassSelect/PassengerClassSelect.jsx'
import DateRangeComp from '../../components/DateSelect/DateRangeComp.jsx'
function Home() {
    return (
        <div>
            <NavBar />
            <SearchForm />
            {/* <PassengerClassSelect /> */}
            {/* <DateRangeComp/> */}
        </div>
    )
}

export default Home 