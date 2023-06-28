import './App.css';
import AddNoteComponeent from './Components/AddNoteComponent';
import NoteViewComponent from './Components/NoteViewComponent';
import Notes from './Components/Notes'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';



function App() {
  return (
    <div>
     <BrowserRouter>
       <Routes>
          <Route path="/mynotes" element={<Notes />}></Route>
          <Route path="/newnote" element={<AddNoteComponeent/>}></Route>
          <Route path="/view/:id" element={<NoteViewComponent/>}></Route>
          <Route path="/view/:id" element={<NoteViewComponent />}></Route>
          <Route path="/editNote/:id" element={<AddNoteComponeent/>}></Route>
          <Route path="/" element={<Notes />}></Route>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
