import noteService from '../services/notes' 

const Note = ({ note, notes, setNotes, setErrorMessage }) => {
  const label = note.important
    ? 'make not important' : 'make important'

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }
        
    noteService
        .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
        setErrorMessage(
            `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
        })
    }
    

  return (
    <li className="note">
      {note.content} 
      <button onClick={() => toggleImportanceOf(note.id)}>{label}</button>
    </li>
  )
}

export default Note