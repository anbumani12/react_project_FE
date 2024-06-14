import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import LogIn from "./componets/LogIn";
import './App.css'

const App = () => (
  <BrowserRouter>
    <div>
      <ToastContainer /> 
      <Routes>
        <Route path="/" element={<LogIn />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
