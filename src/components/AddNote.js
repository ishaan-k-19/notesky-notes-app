import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const[note, setNote]= useState({title:"", description:"", tag:""})

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
        props.showAlert("Added successfully!", "success")
    }

    const onChange = (e) => {
        e.preventDefault();
        setNote({...note,[e.target.name]: e.target.value})
    }
  return (
    <div className='container my-3 p-5 rounded-3 bg-dark'>
      <h1>Add a note</h1>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control border-dark" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange}  />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control border-dark" id="description" name='description' value={note.description} onChange={onChange}  />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control border-dark" id="tag" name='tag' value={note.tag} onChange={onChange}  />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary btn-lg" onClick={handleClick}>Add Note</button>
        </form>
    </div>
  )
}

export default AddNote
