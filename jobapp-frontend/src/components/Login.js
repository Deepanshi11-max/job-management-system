import { useState } from "react";
import api from "../api/api";
import "./Login.css";

function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        username,
        password
      });

      // save token
      localStorage.setItem("token", res.data.token);

      // update app state
      onLogin(res.data.token);

    } catch (err) {
      console.log(err.response?.data);
      setError("Invalid username or password");
    }
  }

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>

        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>

        <p className="switch-auth">
          Don't have an account? <a href="/register">Register here</a>
        </p>

      </form>
    </div>
  );
}

export default Login;

