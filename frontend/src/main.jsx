import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// Import Redux Provider and Store
import { Provider } from 'react-redux'
import store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  {/* <-- Add this wrapper */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>  {/* <-- Close wrapper here */}
  </React.StrictMode>,
)