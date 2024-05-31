import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className="col-md-3 my-3">
            <div class="card text-bg-success mb-3">
                <div class="card-header">{note.tag}</div>
                <div class="card-body">
                    <h4 class="card-title bold">{note.title}</h4>
                    <p class="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully!", "success") }}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={
                        () => { updateNote(note) }}></i>
                </div>
            </div>
            </div>
            )
}

            export default Noteitem
