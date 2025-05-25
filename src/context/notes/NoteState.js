import NoteContext from "./NoteContext";
import React, { useState } from "react";


const NoteState = (props) => {
 const notesInitial=
    [
  {
    "_id": "6829fa76c2b39924a1af4d28",
    "user": "68295198bdcd0e572c748cfc",
    "title": "My Title",
    "description": "Please wake up early",
    "tag": "Personal",
    "date": "2025-05-18T15:19:18.889Z",
    "__v": 0
  },
  {
    "_id": "682a1299c0dd621ac24e297f",
    "user": "68295198bdcd0e572c748cfc",
    "title": "My Title",
    "description": "Please reach office by 8 AM",
    "tag": "Personal",
    "date": "2025-05-18T17:02:17.421Z",
    "__v": 0
  }
]
 
const [notes, setNotes] = useState(notesInitial);
    

    return(
        
        <NoteContext.Provider value={{notes,setNotes}}> 
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;