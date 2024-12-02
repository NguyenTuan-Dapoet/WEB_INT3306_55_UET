import React from 'react'
import './NavBar.css'

function NavBar () {
    return (
        <div className="hero-container">
          {/* nav bar */}
          <nav className="navbar">
            <div className="navbar-links">
              <a href="#find-flight" className="navbar-link">
                <i className="fas fa-plane"></i> Find Flight
              </a>
              <a href="#find-stay" className="navbar-link">
                <i className="fas fa-bed"></i> Find Stay
              </a>
            </div>

            <div className="navbar-logo">
              <span>golobe</span>
            </div>

            <div className="navbar-buttons">
              <button className="navbar-login">Login</button>
              <button className="navbar-signup">Sign up</button>
            </div>
          </nav>

          {/* hero text */}
          <div className="hero-text">
            <p id='title-hero-text'>Helping Others</p>
            <p id='content-hero-text'>LIVE & TRAVEL</p>
            <p id='sub-content-hero-text'>Special offers to suit your plan</p>
          </div>
        </div>
    );
}

export default NavBar   