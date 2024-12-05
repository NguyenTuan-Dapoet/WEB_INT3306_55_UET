import React from 'react'
import "./Login.css"
import { assets } from '../../assets/frontend_assets/assets'
import { FaUser, FaLock } from 'react-icons/fa'
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  return (

    <div className='login-background'>
        <div className='login-container'>
            <form action="">
                <h1>Login</h1>

                <div className="input-box">
                    <input type="text" placeholder='Username' required/>
                    <FaUser className='icon'/>
                </div>

                <div className="input-box">
                    <input type="password" placeholder='Password' required/>
                    <FaLock className='icon'/>
                </div>

                <button type='submit' className='login'>Login</button>
                
                <div className="goolge-box">
                    <button type='submit' className="login-google">Login with Google</button>
                    <FcGoogle className = 'google-icon'/>
                </div>

                
                <div className="signIn-link">
                    <p>Don't have an account? <a href="#">Sign In</a></p>
                </div>

            </form>
        </div>
    </div>
  )
}
export default Login
