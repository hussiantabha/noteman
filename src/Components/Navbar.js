import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <Link to="/">
          <h1 className="text-logo">NoteMan</h1>
        </Link>
        <Link to="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
