import React from 'react'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Create from './components/Create'
import Update from './components/Update'
import Read from './components/Read'
import Login from './components/Login'
import ProtectedRoute from './route/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/"  element={ <Login /> }  />
      <Route path="/login" element={ <Login /> } />
      <Route path="/home" element={ <ProtectedRoute> <Home /> </ProtectedRoute>}></Route>
      <Route path="/create" element={ <ProtectedRoute> <Create /> </ProtectedRoute>}></Route>
      <Route path="/update/:id" element={ <ProtectedRoute> <Update /> </ProtectedRoute>}></Route>
      <Route path="/read/:id" element={ <ProtectedRoute> <Read /> </ProtectedRoute>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
