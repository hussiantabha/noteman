import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  let navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const loginFunc = async () => {
    try {
      const postData = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginInput),
      });
      console.log(postData);
      if (postData.status === 200) {
        const convertedJSON = await postData.json();
        console.log(postData);
        sessionStorage.setItem("token", convertedJSON.encodedToken);
        setLoginInput({ email: "", password: "" });
        navigate("/notes");
      }
      if (postData.status === 404) {
        toast.error("Wrong Details", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setLoginInput({ email: "", password: "" });
        //   navigate("/notes");
      }
    } catch (error) {}
  };
  const testLogin = async () => {
    try {
      const postData = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: "adarshbalika@gmail.com",
          password: "adarshBalika123",
        }),
      });
      if (postData.status === 200) {
        const convertedJSON = await postData.json();
        sessionStorage.setItem("token", convertedJSON.encodedToken);
        setLoginInput({ email: "", password: "" });
        navigate("/notes");
      }
      if (postData.status === 404) {
        toast.error("Wrong Details", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setLoginInput({ email: "", password: "" });
      }
    } catch (error) {}
  };

  // console.log(loginInput);
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
            <h2 className="login-card-title">Login</h2>
          </div>
          <div className="card-content login-input">
            <span className="input-title">Email</span>
            <input
              className="login-input-text"
              placeholder="username@gmail.com"
              value={loginInput.email}
              onChange={(e) =>
                setLoginInput((prevState) => {
                  return { ...prevState, email: e.target.value };
                })
              }
            />
            <span className="input-title">Password</span>
            <input
              className="login-input-text"
              type="password"
              value={loginInput.password}
              onChange={(e) =>
                setLoginInput((prevState) => {
                  return { ...prevState, password: e.target.value };
                })
              }
            />
          </div>
          <div className="login-help">
            <div>
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <a href="#">Forgot Password?</a>
          </div>
          <div className="login-btn">
            <button className="btn btn-primary login-btn" onClick={loginFunc}>
              Login
            </button>
            <button
              className="btn btn-success-outline login-btn"
              onClick={testLogin}
            >
              Login with Test Credentials
            </button>
            <Link to="/signup" className="btn btn-primary-outline login-btn">
              Create New Account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
