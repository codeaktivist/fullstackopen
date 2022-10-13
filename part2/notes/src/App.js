import { useState } from 'react';
import Note from './components/Note'

const App = (props) => {
    const [notes, setNotes] = useState([props.notes])
    console.log('notes', notes);
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const addNote = (event) => {
        event.preventDefault()
        const newObject = {
            id: notes.length + 1,
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        }

        setNotes(notes.concat(newObject))
        setNewNote('')

    }

    const handleNoteChange = (event) => {
        console.log("Changed to ", event.target.value);
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h1>Notes</h1>
            <button onClick={() => setShowAll(!showAll)}>
                Show {showAll ? 'important' : 'all'}
            </button>
            <ul>
                {
                    notesToShow.map(note =>{
                    console.log('note notesToShow', notesToShow)
                    return
                <Note key={note.id} note={note} />}
                )}
            </ul>
            <form onSubmit={addNote}>
                <input 
                    onChange={handleNoteChange}
                    value={newNote}/>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default App;