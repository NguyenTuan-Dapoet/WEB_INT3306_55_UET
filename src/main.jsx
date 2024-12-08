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
import {BrowserRouter} from 'react-router-dom';
import { LocationProvider } from './assets/api/LocationProvider.jsx';
// import { FlightProvider } from './assets/api/FlightProvider.jsx'; 
import { AuthProvider } from './assets/api/AuthProvider.jsx';
import { RegisterProvider } from './assets/api/RegisterProvider.jsx'; 
import { SearchFlightProvider } from './assets/api/SearchFlightProvider.jsx';
import { UserInfoProvider } from './assets/api/UserInfoProvider.jsx';
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <Provider store={store}> {/* Bọc ứng dụng bằng Provider */}
        <AuthProvider>
         <RegisterProvider>
          <UserInfoProvider>
            <LocationProvider>
              <SearchFlightProvider>
                <App />
              </SearchFlightProvider>
          </LocationProvider>
          </UserInfoProvider>
         </RegisterProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  // </StrictMode>
);
