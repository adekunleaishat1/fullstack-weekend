import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Formik from './Components/Formik'

const App = () => {
  return (
    <div>
       <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/formik" element={<Formik/>} />
       </Routes>
    </div>
  )
}

export default App