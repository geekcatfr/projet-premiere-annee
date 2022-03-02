import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route, BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
      <Route path='/' element={<Navbar/>}>
        <Route index element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
