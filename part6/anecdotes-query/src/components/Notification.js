import { useContext } from "react"
import { NoteContext } from "../NoteContext"

const Notification = () => {
    const [note, noteDispatch] = useContext(NoteContext)
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }

    if (!note.text) return null

    return (
        <div style={style}>
            {note.text}
        </div>
    )
}

export default Notification
