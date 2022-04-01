import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar";

const SignUp = () => {
  let navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const signupFunc = async () => {
    const postData = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(input),
    });
    console.log(postData);
    if (postData.status === 201) {
      const convertedJSON = await postData.json();
      sessionStorage.setItem("token", convertedJSON.encodedToken);
      setInput({ email: "", password: "" });
      navigate("/notes");
    }
    if (postData.status === 422) {
      toast.error("Oops! Email ALready exists", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setInput({ email: "", password: "" });
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <section className="login-container">
        <div className="card card-head-first login">
          <div className="card-content head-first">
            <h2 className="login-card-title">Signup</h2>
          </div>
          <div className="card-content login-input">
            <span className="input-title">Email</span>
            <input
              className="login-input-text "
              placeholder="username@gmail.com"
              value={input.email}
              onChange={(e) => {
                setInput((prevState) => {
                  return { ...prevState, email: e.target.value };
                });
              }}
            />
            <span className="input-title">Password</span>
            <input
              className="login-input-text "
              type="password"
              value={input.password}
              onChange={(e) => {
                setInput((prevState) => {
                  return { ...prevState, password: e.target.value };
                });
              }}
            />
          </div>
          <div className="login-help">
            <div>
              <input type="checkbox" />
              <span>I accept all Terms & Conditions</span>
            </div>
          </div>
          <div className="login-btn">
            <button className="btn btn-primary login-btn" onClick={signupFunc}>
              Create New Account
            </button>

            <button className="btn btn-primary-outline login-btn">
              <Link to="/login">Already have an account</Link>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
