import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { NotesContext } from "../Context/NotesContext";

const Navbar = () => {
  const { logoutUser } = useContext(NotesContext);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      setUserLoggedIn(false);
    } else if (sessionStorage.getItem("token") === "undefined") {
      setUserLoggedIn(false);
    } else {
      setUserLoggedIn(true);
    }
  });
  return (
    <>
      <nav className="nav">
        <Link to="/">
          <h1 className="text-logo">NoteMan</h1>
        </Link>
        {isUserLoggedIn ? (
          <button className="btn btn-primary" onClick={logoutUser}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        )}
      </nav>
    </>
  );
};

export default Navbar;
