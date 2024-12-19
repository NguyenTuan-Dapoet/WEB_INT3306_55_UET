// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider từ react-redux
import store from './Redux/store.js'; // Import Redux store
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LocationProvider } from './assets/api/LocationProvider.jsx';
// import { FlightProvider } from './assets/api/FlightProvider.jsx'; 
import { AuthProvider } from './assets/api/AuthProvider.jsx';
import { RegisterProvider } from './assets/api/RegisterProvider.jsx';
import { SearchFlightProvider } from './assets/api/SearchFlightProvider.jsx';
import { UserInfoProvider } from './assets/api/UserInfoProvider.jsx';
import { BookingProvider } from './assets/api/BookingProvider.jsx';
import { TicketProvider } from './assets/api/TicketProvider.jsx';
import { NewsProvider } from './assets/api/NewsProvider.jsx';
import { CancelBookingProvider } from './assets/api/CancelBookingProvider.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleAuthProvider } from './assets/api/GoogleAuthProvider.jsx';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <Provider store={store}> {/* Bọc ứng dụng bằng Provider */}
      <AuthProvider>
      <GoogleOAuthProvider clientId="933074976778-cbfjur7vlgb2nqrnb6unpum00qa7agkg.apps.googleusercontent.com">

        <GoogleAuthProvider>
            <RegisterProvider>
              <UserInfoProvider>
                <LocationProvider>
                  <NewsProvider>
                    <SearchFlightProvider>
                      <BookingProvider>
                        <TicketProvider>
                          <CancelBookingProvider>
                            <App />
                          </CancelBookingProvider>
                        </TicketProvider>
                      </BookingProvider>
                    </SearchFlightProvider>
                  </NewsProvider>
                </LocationProvider>
              </UserInfoProvider>
            </RegisterProvider>
        </GoogleAuthProvider>

        </GoogleOAuthProvider>
      </AuthProvider>
    </Provider>
  </BrowserRouter>
  // </StrictMode>
);
