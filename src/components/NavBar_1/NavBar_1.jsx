import React, { useState } from 'react'
import './NavBar_1.css'
import { Link } from 'react-router-dom';

export const NavBar_1 = () => {

  const [tab, setTab] = useState("Find Flight");

  return (
    <div className='navbar'>
        <Link to ="/home" className='navbar-logo'>Global</Link>

        <ul className='navbar-menu'>
            <a 
              className= {tab ==='Find Flight'?"active":""}
              onClick={() => setTab("Find Flight")}
            >Find Flight</a>

            <a 
              className= {tab ==='Find Stay'?"active":""}
              onClick={() => setTab("Find Stay")}
            >Find Stay</a>
        </ul>
        
        <ul className='navbar-sign'>
            <Link to= {"/login"} >Login</Link>
            <Link to={"/signup"}>Sign Up</Link>
        </ul>
    </div>
  )
}

export default NavBar_1;