// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BusinessCard from "./BusinessCard";

// 1. Create a simple "Public" landing page component
// This is what people see if they go to "yoursite.com" directly
const PublicLanding = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
    <h1 className="text-3xl font-bold text-slate-900 mb-4">Digital Business Cards</h1>
    <p className="text-slate-600 mb-8">
      Professional digital identity solutions for modern businesses.
    </p>
    <a 
      href="mailto:your-email@example.com" 
      className="bg-slate-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-800 transition"
    >
      Contact to Get Yours
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* 2. The Root URL now shows the generic page (Safe for public) */}
        <Route path="/" element={<PublicLanding />} />

        {/* 3. The "Secret" Admin URL */}
        {/* Only YOU know this URL. Use this to view/manage your clients */}
        <Route path="/admin-portal" element={<Home />} />

        {/* 4. The Client Card Route (Unchanged) */}
        <Route path="/card/:clientId" element={<BusinessCard />} />
      </Routes>
    </Router>
  );
}

export default App;