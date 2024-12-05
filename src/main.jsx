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

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <Provider store={store}> {/* Bọc ứng dụng bằng Provider */}
        <App />
      </Provider>
    </BrowserRouter>
  // </StrictMode>
);
