import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { NotesContext } from "../Context/NotesContext";

const Navbar = () => {
  const { logoutUser, noteState, dispatch } = useContext(NotesContext);
  const navigate = useNavigate();
  const logout = () => {
    console.log("Click");
    sessionStorage.clear();
    dispatch({ type: "userLoggedIn", payload: { value: false } });
    navigate("/login");
  };
  return (
    <>
      <nav className="nav">
        <Link to="/notes">
          <h1 className="text-logo">NoteMan</h1>
        </Link>
        <div className="nav-btn-container">
          <Link to={noteState.isUserLoggedIn ? "/notes" : "/login"}>
            <h3>Your Notes</h3>
          </Link>
          {noteState.isUserLoggedIn ? (
            <button className="btn btn-primary" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
