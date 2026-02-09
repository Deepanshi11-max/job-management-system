import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <h1>
        Job Management
        <br />
        System
      </h1>

      <p>
        Manage job postings with secure backend APIs using Spring Boot and React
      </p>

      <div className="hero-buttons">
        <button className="btn-primary" onClick={() => navigate('/jobs')}>
          View Jobs
        </button>
        <button className="btn-outline" onClick={() => navigate('/register')}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Hero;

