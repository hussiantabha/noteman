import { useReducer, createContext, useEffect, useState } from "react";

const NotesContext = createContext({});

const NotesContextProvider = ({ children }) => {
  const [notesData, setNotesData] = useState([]);
  const token = sessionStorage.getItem("token");

  const getData = async () => {
    const response = await fetch("/api/notes", {
      method: "GET",
      headers: {
        authorization: token,
      },
    });
    const convertedJSON = await response.json();
    setNotesData(convertedJSON.notes);
    dispatch({ type: "addNote", payload: { value: convertedJSON.notes } });
  };
  const noteReducerFunc = (state, action) => {
    //console.log(action.payload.value);
    switch (action.type) {
      case "addNote": {
        return { ...state, notes: action.payload.value };
      }
      case "deleteNote": {
        return { ...state, notes: action.payload.value };
      }
      case "editNote": {
        return { ...state, notes: action.payload.value };
      }
      case "edit": {
        return { ...state, edit: action.payload.value };
      }
      case "editInput": {
        return { ...state, editNote: action.payload.value };
      }
      case "getArchive": {
        return { ...state, archiveNotes: action.payload.value };
      }
      case "postArchive": {
        return { ...state, archiveNotes: action.payload.value };
      }
      case "deleteArchiveNotes": {
        return { ...state };
      }
      case "getTrash": {
        return { ...state, trashNotes: action.payload.value };
      }
      case "postTrash": {
        return { ...state, trashNotes: action.payload.value };
      }
      case "restoreTrash": {
        return { ...state, trashNotes: action.payload.value };
      }
      case "deleteTrash": {
        return { ...state, trashNotes: action.payload.value };
      }
      case "workValue": {
        return { ...state, workValue: !state.workValue };
      }
      case "healthValue": {
        return { ...state, workValue: !state.healthValue };
      }
      case "homeValue": {
        return { ...state, workValue: !state.homeValue };
      }
      case "schoolValue": {
        return { ...state, workValue: !state.schoolValue };
      }
      case "sortPriority": {
        return { ...state, priority: !state.priority };
      }
      case "sortDate": {
        return { ...state, date: !state.date };
      }
      case "addTag": {
        return {
          ...state,
          tagsFilter: action.payload.value
            ? [...state.tagsFilter, action.payload.filter]
            : state.tagsFilter.filter((item) => item !== action.payload.filter),
          workValue:
            action.payload.filter === "work"
              ? !state.workValue
              : state.workValue,
          healthValue:
            action.payload.filter === "health"
              ? !state.healthValue
              : state.healthValue,
          homeValue:
            action.payload.filter === "home"
              ? !state.homeValue
              : state.homeValue,
          schoolValue:
            action.payload.filter === "school"
              ? !state.schoolValue
              : state.schoolValue,
        };
      }
      case "clearAll": {
        return {
          ...state,
          workValue: false,
          healthValue: false,
          homeValue: false,
          schoolValue: false,
          tagsFilter: [],
          priority: false,
          date: false,
        };
      }
      case "userLoggedIn": {
        return { ...state, isUserLoggedIn: action.payload.value };
      }
    }
  };
  const arr = ["low", "medium", "high"];
  const sortPriority = (state, data) => {
    if (state.priority) {
      const sorted = data.sort((a, b) => {
        return b.tags[1] - a.tags[1];
      });
      return sorted;
    }
    return data;
  };

  const sortTag = (state, data) => {
    if (state.tagsFilter.length > 0) {
      const sorted = data.filter((item) =>
        noteState.tagsFilter.includes(item.tags[0])
      );
      return sorted;
    }
    return data;
  };
  const sortDate = (state, data) => {
    if (state.date) {
      const sorted = data.sort((a, b) => {
        return a.date - b.date;
      });
      return sorted;
    }
    return data;
  };
  // const sortbyDate = () => {
  //   const sorted = noteState.notes.sort((a, b) => b.date - a.date);
  //   console.log(sorted);
  // };
  const [noteState, dispatch] = useReducer(noteReducerFunc, {
    notes: [],
    archiveNotes: [],
    trashNotes: [],
    edit: false,
    editNote: "",
    workValue: false,
    healthValue: false,
    homeValue: false,
    schoolValue: false,
    priority: false,
    date: false,
    tagsFilter: [],
    isUserLoggedIn: false,
  });
  const logoutUser = () => {
    setUserLoggedIn(false);
    sessionStorage.clear();
  };
  useEffect(() => {
    getData();
  }, [noteState]);
  const prioritytArr = sortPriority(noteState, notesData);
  const sortdateArr = sortDate(noteState, prioritytArr);
  const sortTagArr = sortTag(noteState, sortdateArr);
  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      dispatch({ type: "userLoggedIn", payload: { value: false } });
    } else if (sessionStorage.getItem("token") === undefined) {
      dispatch({ type: "userLoggedIn", payload: { value: false } });
    } else {
      dispatch({ type: "userLoggedIn", payload: { value: true } });
    }
  }, []);
  return (
    <NotesContext.Provider
      value={{ noteState, dispatch, sortTagArr, logoutUser }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesContextProvider };
//  const few = async (state) => {
//    console.log(state);
//    const postData = await fetch("/api/notes", {
//      method: "POST",
//      headers: {
//        "Content-type": "application/json",
//        authorization: token,
//      },
//      body: JSON.stringify({
//        note: {
//          note: action.payload.value,
//        },
//      }),
//    });
//    const convertedJSON = await postData.json();
//    return convertedJSON.notes;
//  };
