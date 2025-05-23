import NoteContext from "./NoteContext";
import React, { useState } from 'react';

const NoteState = (props) => {
    const s1 = {
        name : "Aniket",
        class : "3rd Year",
    }

    const [state, setState] = useState(s1);

    const update = () =>{
        setTimeout(() => {
            setState({
                name : "Aniket",
                class : "4th Year",
            })
        }, 1000);
    }

    return(
        
        <NoteContext.Provider value={{state:state, update:update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;