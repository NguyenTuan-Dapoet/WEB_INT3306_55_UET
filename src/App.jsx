import React from 'react'
import NavBar_1 from './components/NavBar_1/NavBar_1.jsx'
import Home from './screens/Home/Home.jsx'
import Login from './screens/Login/Login.jsx'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer.jsx'

function App() {
  return (
    <>
      <div className="app">
        <NavBar_1/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
        </Routes>
        {/* <Home /> */}
      </div>
      <Footer/>
    </>
  )
}

export default App
