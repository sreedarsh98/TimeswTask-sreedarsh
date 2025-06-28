import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login/Login';
import CountryPage from './Components/Country/CountryPage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Login/> */}
    <CountryPage/>
    </>
  )
}

export default App
