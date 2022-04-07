import React, { useEffect, useContext } from "react";
import "../App.css";
import Navbar from "../Components/Navbar";
import { NotesContext } from "../Context/NotesContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BiHome,
  BiLabel,
  BiArchive,
  BiTrashAlt,
  BiX,
  BiEditAlt,
} from "react-icons/bi";

const Archive = () => {
  const token = sessionStorage.getItem("token");
  const { noteState, dispatch } = useContext(NotesContext);
  const dateobj = new Date();
  const currentDate = {
    day: dateobj.getDate().toString(),
    month: dateobj.getMonth() + 1,
    year: dateobj.getFullYear().toString(),
  };
  const ss = currentDate.day + currentDate.month.toString() + currentDate.year;
  const displayDate = `${currentDate.day} / ${currentDate.month.toString()} / ${
    currentDate.year
  };`;
  const getData = async () => {
    const response = await fetch("/api/archives", {
      method: "GET",
      headers: {
        authorization: token,
      },
    });
    const convertedJSON = await response.json();
    dispatch({
      type: "getArchive",
      payload: { value: convertedJSON.archives },
    });
  };
  const deleteNote = async (note) => {
    const postData = await fetch(`/api/archives/delete/${note._id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    if (postData.status === 200) {
      const convertedJSON = await postData.json();
      toast.success("Note Deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  useEffect(() => {
    getData();
  });

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
      <h1>Archive Notes</h1>
      <section className="displayArchiveNotes">
        {noteState.archiveNotes === undefined ? (
          <h2>No Notes </h2>
        ) : (
          noteState.archiveNotes.map((item) => {
            return (
              <>
                <section className="note-container">
                  <h2>{item.title}</h2>
                  <p>{item.note}</p>
                  <div className="note-bottom-row">
                    <div className="note-tag-container">
                      {item.tags.map((tag) => {
                        let conditionTag = "";
                        if (tag === "1") {
                          conditionTag = "Low";
                        } else if (tag === "2") {
                          conditionTag = "Medium";
                        } else if (tag === "3") {
                          conditionTag = "high";
                        } else if (tag.includes(["3", "2", "1"]) === false) {
                          conditionTag = tag;
                        }
                        return (
                          <>
                            <p className="px-1 tag-pill">{conditionTag}</p>
                          </>
                        );
                      })}
                    </div>
                    <span>{displayDate}</span>
                    <div className="note-icon-container">
                      <button onClick={() => deleteNote(item)}>
                        <BiTrashAlt className="px-1" />
                      </button>
                    </div>
                  </div>
                </section>
              </>
            );
          })
        )}
      </section>
    </>
  );
};

export default Archive;
