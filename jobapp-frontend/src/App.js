import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Register from "./components/Register";
import JobDashboard from "./components/JobDashboard";

function App() {

  // =========================
  // JWT TOKEN STATE
  // =========================
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  // =========================
  // LOGOUT
  // =========================
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  // =========================
  // UI WITH ROUTING
  // =========================
  return (
    <BrowserRouter>
      <Navbar token={token} logout={logout} />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Hero />} />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            token ? <Navigate to="/jobs" /> : <Login onLogin={setToken} />
          }
        />

        {/* Register Page */}
        <Route
          path="/register"
          element={
            token ? <Navigate to="/jobs" /> : <Register onRegister={setToken} />
          }
        />

        {/* Jobs Dashboard (Protected) */}
        <Route
          path="/jobs"
          element={
            token ? <JobDashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;









