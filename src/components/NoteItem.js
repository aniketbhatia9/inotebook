import React from 'react';

const NoteItem = (props) => {
    const {note} = props;
  return (
    <div className='col-md-3'>     
      <div key={note._id} className="card my-3">
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <p className="card-text">
                  <small className="text-muted">{note.tag}</small>
                </p>
              </div>
            </div>
    </div>
  );
}

export default NoteItem;
