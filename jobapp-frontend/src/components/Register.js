import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./Register.css";

function Register({ onRegister }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        username,
        password
      });

      // save token
      localStorage.setItem("token", res.data.token);

      // update app state
      onRegister(res.data.token);

      // redirect to jobs
      navigate("/jobs");

    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Registration failed. Username may already exist.");
    }
  }

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleRegister}>

        <h2>Register</h2>

        {error && <p className="error">{error}</p>}

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button>Register</button>

        <p className="switch-auth">
          Already have an account? <a href="/login">Login here</a>
        </p>

      </form>
    </div>
  );
}

export default Register;
