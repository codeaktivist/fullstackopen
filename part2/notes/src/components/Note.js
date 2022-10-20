const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'change to not important':'change to important'
    return (
      <li>{note.content}
      <button onClick={toggleImportance}>{label}</button></li>
    )
  }
  
  export default Note