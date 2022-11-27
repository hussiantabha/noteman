import React, { useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import { NotesContext } from "../Context/NotesContext";
import { BiTrashAlt } from "react-icons/bi";
import { FaTrashRestore } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Trash = () => {
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
    const response = await fetch("/api/trash", {
      method: "GET",
      headers: {
        authorization: token,
      },
    });
    const convertedJSON = await response.json();
    console.log(convertedJSON);
    dispatch({
      type: "getTrash",
      payload: { value: convertedJSON.trash },
    });
  };
  const deleteTrash = async (note) => {
    const deleteNoteTrash = await fetch(`/api/trash/delete/${note._id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
      body: JSON.stringify({ note }),
    });
    if (deleteNoteTrash.status === 200) {
      const convertedJSON = await deleteNoteTrash.json();
      dispatch({
        type: "deleteTrash",
        payload: { value: convertedJSON.trash },
      });
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
  const restoreTrash = async (note) => {
    const restoreNote = await fetch(`/api/trash/restore/${note._id}`, {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: JSON.stringify({ note }),
    });
    if (restoreNote.status === 200) {
      const convertedJSON = await restoreNote.json();
      dispatch({
        type: "restoreTrash",
        payload: { value: convertedJSON.trash },
      });
      toast.success("Note Restored", {
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
  }, []);
  //   console.log(noteState);
  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
      <section>
        <h1>Trash Notes</h1>
        <section className="displayArchiveNotes">
          {noteState.trashNotes === undefined ? (
            <h2>No Notes </h2>
          ) : (
            noteState.trashNotes.map((item) => {
              return (
                <>
                  <section
                    style={{ backgroundColor: item.color }}
                    className="note-container"
                  >
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
                        <button onClick={() => deleteTrash(item)}>
                          <BiTrashAlt className="px-1" />
                        </button>
                        <button onClick={() => restoreTrash(item)}>
                          <FaTrashRestore className="px-1" />
                        </button>
                      </div>
                    </div>
                  </section>
                </>
              );
            })
          )}
        </section>
      </section>
    </>
  );
};

export default Trash;
