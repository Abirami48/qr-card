// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BusinessCard from "./BusinessCard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route 1: The Home Page */}
        <Route path="/" element={<Home />} />

        {/* Route 2: The Dynamic Business Card Page */}
        {/* :clientId is a variable that captures whatever you type (e.g., "jane-fashion") */}
        <Route path="/card/:clientId" element={<BusinessCard />} />
      </Routes>
    </Router>
  );
}

export default App;