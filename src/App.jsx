import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login/Login';
import CountryPage from './Components/Country/CountryPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<CountryPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
