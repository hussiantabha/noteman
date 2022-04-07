import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import {
  BiHome,
  BiLabel,
  BiArchive,
  BiTrashAlt,
  BiX,
  BiEditAlt,
} from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import "../App.css";
import { useContext } from "react";
import { NotesContext } from "../Context/NotesContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Notes = () => {
  const [noteInput, setNoteInput] = useState({
    title: "",
    note: "",
    tag1: "work",
    tag2: "1",
    tags: [],
  });
  const [showmodal, setShowmodal] = useState(false);
  const [date, setDate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [editNote, setEditNoteInput] = useState({
    title: "",
    note: "",
    tag1: "",
    tag2: "",
    tags: [],
  });
  const token = sessionStorage.getItem("token");
  const { noteState, dispatch, sortTagArr } = useContext(NotesContext);
  console.log(noteState);
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
  // console.log(ss);
  const getData = async () => {
    const response = await fetch("/api/notes", {
      method: "GET",
      headers: {
        authorization: token,
      },
    });
    const convertedJSON = await response.json();
  };
  const addNote = async () => {
    const postData = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        note: {
          title: noteInput.title,
          note: noteInput.note,
          tags: [noteInput.tag1, noteInput.tag2],
          date: ss,
        },
      }),
    });
    if (postData.status === 201) {
      const convertedJSON = await postData.json();
      dispatch({ type: "addNote", payload: { value: convertedJSON.notes } });
    }
    setNoteInput({
      title: "",
      note: "",
      tag1: "work",
      tag2: "1",
    });
    setShowmodal(false);
  };
  const deleteNote = async (note) => {
    const postData = await fetch(`/api/notes/${note._id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    });
    if (postData.status === 200) {
      const convertedJSON = await postData.json();
      dispatch({ type: "deleteNote", payload: { value: convertedJSON.notes } });
      toast.success("Note Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  // const editFunc = async (note) => {
  //   const finalNote = noteState.notes.filter((item) => item._id === note._id);
  //   dispatch({ type: "editInput", payload: { value: finalNote[0].note } });
  //   // setEditNoteInput(finalNote[0].note);
  // };
  const restEdit = async (note) => {
    const postData = await fetch(`/api/notes/${note._id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        note: {
          note: noteState.editNote,
          date: Date.now(),
        },
      }),
    });
    if (postData.status === 201) {
      const convertedJSON = await postData.json();
      dispatch({ type: "editNote", payload: { value: convertedJSON.notes } });
    }
    dispatch({ type: "edit", payload: { value: false } });
    setEdit(false);
  };
  const editNoteFunc = async () => {
    // setShowmodal(true);
    // setNoteInput({
    //   title: note.title,
    //   note: note.note,
    //   tags: note.tags,
    // });
    const postData = await fetch(`/api/notes/${noteInput._id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        note: {
          title: noteInput.title,
          note: noteInput.note,
          tags: [noteInput.tag1, noteInput.tag2],
        },
      }),
    });
    if (postData.status === 201) {
      const convertedJSON = await postData.json();
      dispatch({ type: "editNote", payload: { value: convertedJSON.notes } });
      setNoteInput({
        title: "",
        note: "",
        tag1: "work",
        tag2: "1",
        tags: [],
      });
      setShowmodal(false);
    }
  };
  const postArchive = async (note) => {
    const postData = await fetch(`/api/notes/archives/${note._id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        note,
      }),
    });
    const convertedJSON = await postData.json();
    dispatch({
      type: "postArchive",
      payload: { value: convertedJSON.archives },
    });
    dispatch({ type: "deleteNote", payload: { value: convertedJSON.notes } });
  };
  const showEditModal = (item) => {
    setShowmodal(true);
    setEdit(true);
    setNoteInput({
      title: item.title,
      note: item.note,
      tag1: item.tags[0],
      tag2: item.tags[1],
      _id: item._id,
    });
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
              <Link to="/archive">
                <BiArchive /> <span>Archive</span>
              </Link>
            </div>
            <div className="notes-sidebar-icon-div">
              <BiTrashAlt /> <span>Trash</span>
            </div>
            <div className="notes-sidebar-icon-div">
              <CgProfile /> <span>Profile</span>
            </div>
            <div className="notes-sidebar-icon-div">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowmodal(true);
                }}
              >
                Create Note
              </button>
            </div>
          </div>
        </aside>
        <main className="notes-mainbar">
          <div className="search-box-container">
            <input
              type={"text"}
              placeholder="Search Notes"
              className="search-box"
            />
            <button
              className="btn btn-primary-outline"
              onClick={() => setShowFilterModal(true)}
            >
              Filters
            </button>
          </div>
          <section
            className={showFilterModal ? "filter-modal" : "filter-modal-hide"}
          >
            <div
              className="notes-modal-closeBtn"
              onClick={() => setShowFilterModal(false)}
            >
              <BiX />
            </div>
            <input
              type="radio"
              checked={noteState.priority}
              onChange={(e) => dispatch({ type: "sortPriority" })}
            />
            Sort by Priority
            <input
              type={"radio"}
              checked={noteState.date}
              onChange={(e) => dispatch({ type: "sortDate" })}
            />
            Sort by Date
            <div>
              <input
                type={"checkbox"}
                checked={noteState.workValue}
                onChange={(e) =>
                  dispatch({
                    type: "addTag",
                    payload: { value: e.target.checked, filter: "work" },
                  })
                }
              />
              Work
              <input
                type={"checkbox"}
                checked={noteState.healthValue}
                onChange={(e) =>
                  dispatch({
                    type: "addTag",
                    payload: { value: e.target.checked, filter: "health" },
                  })
                }
              />
              Health
              <input
                type={"checkbox"}
                checked={noteState.homeValue}
                onChange={(e) =>
                  dispatch({
                    type: "addTag",
                    payload: { value: e.target.checked, filter: "home" },
                  })
                }
              />{" "}
              Home
              <input
                type={"checkbox"}
                checked={noteState.schoolValue}
                onChange={(e) =>
                  dispatch({
                    type: "addTag",
                    payload: { value: e.target.checked, filter: "school" },
                  })
                }
              />
              School
            </div>
            <button
              className="btn btn-primary-outline"
              onClick={() => dispatch({ type: "clearAll" })}
            >
              Clear All
            </button>
          </section>
          {/* className={showmodal ? "notes-modal" : "notes-modal-hide"} */}
          <div className={showmodal ? "notes-modal" : "notes-modal-hide"}>
            <div
              className="notes-modal-closeBtn"
              onClick={() => setShowmodal(false)}
            >
              <BiX />
            </div>
            <label>Title</label>
            <input
              value={noteInput.title}
              type="text"
              className="note-input"
              onChange={(e) =>
                setNoteInput((prev) => {
                  return { ...prev, title: e.target.value };
                })
              }
            />
            <label>Note</label>
            <textarea
              className="note-textarea"
              value={noteInput.note}
              type="text"
              onChange={(e) =>
                setNoteInput((prev) => {
                  return { ...prev, note: e.target.value };
                })
              }
            />
            <div className="select-container">
              <div>
                <select
                  value={noteInput.tag1}
                  onChange={(e) =>
                    setNoteInput((prev) => {
                      return { ...prev, tag1: e.target.value };
                    })
                  }
                >
                  <option value="work">Work</option>
                  <option value="health">Health</option>
                  <option value="home">Home</option>
                  <option value="school">School</option>
                </select>
              </div>
              <div>
                <select
                  value={noteInput.tag2}
                  onChange={(e) =>
                    setNoteInput((prev) => {
                      return { ...prev, tag2: e.target.value };
                    })
                  }
                >
                  <option value="1">Low</option>
                  <option value="2">medium</option>
                  <option value="3">High</option>
                </select>
              </div>
            </div>
            <div className="addnotes-btn-container">
              {edit ? (
                <button className="btn btn-primary" onClick={editNoteFunc}>
                  Edit Note
                </button>
              ) : (
                <button className="btn btn-primary" onClick={addNote}>
                  Add Notes
                </button>
              )}
            </div>
          </div>
          <section className="allNotes-container">
            {sortTagArr === undefined ? (
              <h2>No Notes </h2>
            ) : (
              sortTagArr.map((item) => {
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
                            } else if (
                              tag.includes(["3", "2", "1"]) === false
                            ) {
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
                          <button onClick={() => postArchive(item)}>
                            <BiArchive className="px-1" />
                          </button>
                          <button onClick={() => deleteNote(item)}>
                            <BiTrashAlt className="px-1" />
                          </button>
                          <button onClick={() => showEditModal(item)}>
                            <BiEditAlt />
                          </button>
                        </div>
                      </div>
                    </section>
                  </>
                );
              })
            )}
          </section>
        </main>
      </section>
    </>
  );
};

export { Notes };