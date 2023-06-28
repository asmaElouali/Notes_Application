import { useEffect, useState } from "react";
import {readAll} from "../services/notes.sevice";
import { Link } from "react-router-dom";


const Notes = () => {
    const [notes,setNotes] = useState([]);
    
    useEffect(()=>{
        readAll().then(Response=>{
            console.log(`Received the response from API ${Response.data}`);
            setNotes(Response.data);
        }).catch(error=>{
            console.log(`Error occured ${error}`);
        });
    },[]);
    return (
        <div>
            <Link to='/newnote'>New Note</Link>
        <table border={1}>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
            {
                notes.map((note) => (

                    <tr key={note.id}>
                        <td>{note.title}</td>
                        <td>{note.body}</td>
                        <td>
                           <Link to={`/view/${note.id}`}>view</Link>
                        </td>
                    </tr>
                ))
            }
        </table>
        </div>
    );
}

export default Notes;