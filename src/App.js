import './App.css';
import NoteState from './context/notes/NoteState';
import { BrowserRouter as Router,
    Route,
    Routes    
 } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
function App() {
  return (
    <>
    <NoteState>          
   <Router>
    <Navbar/> 
    <div className="container">      
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        </Routes>
        </div>
      </Router>
      </NoteState>
</>
    
  );
}

export default App;
