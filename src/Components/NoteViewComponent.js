import { useEffect, useState } from "react";
import { deleteOne, readOne } from "../services/notes.sevice";
import { Link, useNavigate,useParams } from "react-router-dom";

const NoteViewComponent = () => {
    const { id }= useParams();
    const navigate=useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');
    const [updatedAt, setUpdatedAt]= useState('');




      
    const getNoteById = async () =>{
           try{
              const response= await readOne(id);
              const existing=response.data;
              setTitle(existing.title);
              setBody(existing.body);
              setCategory(existing.category);
              setUpdatedAt(existing.updatedAt);
           }catch(error){
              console.error('Error occured while retriving the data from API');
           }
    }

   const deleteNote = async ()=>{
       try{
             await deleteOne(id);
             navigate("/mynotes");
       }catch{
            console.error("Error occured while deleting the Note");
       }
   }

    
    useEffect(()=>{
       getNoteById(id);
    },[id])
    return ( 
       <div>
        <div>
           <h1>Note Details</h1>
           <hr/>
           <h2>{title}</h2>
           <p>Posted On {new Date(updatedAt).toDateString()} by Asma EL ouali</p>
           <span>{category}</span>
        </div>
        <div dangerouslySetInnerHTML={{__html: body }}></div>
        <button onClick={deleteNote}>Delete</button>
        <Link to={`/editnote/${id}`}>Edit</Link>
        <Link to="/mynotes">Back to Notes</Link>
        </div>

     );
}
 
export default NoteViewComponent;