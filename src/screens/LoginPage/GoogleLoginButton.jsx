// // GoogleLoginButton.jsx
// import React, { useContext } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { GoogleAuthContext } from '../../assets/api/GoogleAuthProvider';
// import './GoogleLoginButton.css';

// const GoogleLoginButton = () => {
//     const { authenticateWithGoogle, gg_error } = useContext(GoogleAuthContext);

//     return (
//         <div className="google-login-container">
//             <div className="google-login">
//                 <GoogleLogin
//                     onSuccess={(credentialResponse) => {
//                         const credential = credentialResponse?.credential;
//                         authenticateWithGoogle(credential);
//                         console.log('Google User Info:', credential);
//                     }}
//                     onError={() => {
//                         console.error('Đăng nhập Google thất bại.');
//                     }}
//                 />
//             </div>
//             {gg_error && <p className="error-message">{gg_error}</p>}
//         </div>
//     );
// };

// export default GoogleLoginButton;


import React, { useContext } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleAuthContext } from '../../assets/api/GoogleAuthProvider';
import './GoogleLoginButton.css';
import { FcGoogle } from "react-icons/fc";


const GoogleLoginButton = () => {
    const { authenticateWithGoogle, gg_error } = useContext(GoogleAuthContext);

    const login = useGoogleLogin(
        {
            onSuccess: (tokenResponse) => {
                authenticateWithGoogle(tokenResponse.access_token);
                console.log('Google User Info:', tokenResponse);
                console.log('Google User Token:', tokenResponse.access_token);
            },
            onError: () => {
                console.error('Failed to login with Google.');
            },
        }
    );

    return (
        <div className="google-login">
            <button className="custom-google-login" onClick={() => login()}>
                <span className='google-icon'><FcGoogle /></span>
                <p className='google-button-content'>Login with Google</p>
            </button>
            {gg_error && <p className="error-message">{gg_error}</p>}
            {/* <p className="google-error-message">test lỗi</p> */}
        </div>
    );
};

export default GoogleLoginButton;
