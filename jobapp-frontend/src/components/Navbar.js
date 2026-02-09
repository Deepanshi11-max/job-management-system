import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ token, logout }) {
  return (
    <nav>
      <div className="nav-brand">Job Portal</div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/jobs">Jobs</Link>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;


