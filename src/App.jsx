import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import {Routes , Route} from 'react-router-dom'
import './App.css' // Assuming you have some global styles

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  )
}


export default App