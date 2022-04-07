import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <main className="hero-container">
        <div className="hero-text-container">
          <div>
            <h2 className="hero-headText">Meet your modern </h2>
            <h2 className="hero-headText">Note Taking App</h2>
            <p>Manage your daily tasks and workflow in a</p>
            <p>modern way and boost your efficiency </p>
            <p>without any efforts.</p>
          </div>
          <div className="hero-btn-container">
            <Link to="/signup">
              <button className="btn btn-primary">Join Now</button>
            </Link>
            <Link to="/login">
              <p>Alreay Have an Account</p>
            </Link>
          </div>
        </div>
        <div className="hero-img-container">
          <img className="hero-img" src="../assets/illustration.svg" />
        </div>
      </main>
    </>
  );
};

export default Hero;
