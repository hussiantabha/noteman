import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Notes } from "./Pages/Notes";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import { NotesContextProvider } from "./Context/NotesContext";
import MockAPI from "./Components/MockMan";
import Archive from "./Pages/Archive";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <NotesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mock" element={<MockAPI />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </BrowserRouter>
    </NotesContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
