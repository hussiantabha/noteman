import React from "react";
import Navbar from "../Components/Navbar";
import { BiHome, BiLabel, BiArchive, BiTrashAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import "../App.css";
const Notes = () => {
  return (
    <>
      <Navbar />
      <section className="notes-grid">
        <aside className="notes-sidebar">
          <div className="notes-sidebar-container">
            <div className="notes-sidebar-icon-div">
              <BiHome /> <span>Home</span>
            </div>
            <div className="notes-sidebar-icon-div">
              <BiLabel /> <span>Label</span>
            </div>
            <div className="notes-sidebar-icon-div">
              <BiArchive /> <span>Archive</span>
            </div>
            <div className="notes-sidebar-icon-div">
              <BiTrashAlt /> <span>Trash</span>
            </div>
            <div className="notes-sidebar-icon-div">
              <CgProfile /> <span>Profile</span>
            </div>
          </div>
        </aside>
        <main className="notes-mainbar">
          <h1>Main section</h1>
          <div className="notes-input-container">
            <textarea className="notes-input" />
            <button className="btn btn-primary">Add Note</button>
          </div>
        </main>
      </section>
    </>
  );
};

export { Notes };
