import React from 'react';
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;
  return (
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 && "No notes to display"}
        {notes.map((note) => {
          return (
            <NoteItem note={note}/>
          );
        })}
      </div>   
  );
}

export default Notes;


