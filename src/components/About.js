import React, {useContext, useEffect} from 'react';
import noteContext from '../context/notes/NoteContext';

const About = () => {
  const a = useContext(noteContext);  
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  return (
    <div>           
      This is the about {a.state.name} and he is in {a.state.class} class
    </div>
  );
}

export default About;
