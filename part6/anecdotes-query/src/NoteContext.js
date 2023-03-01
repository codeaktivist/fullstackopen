import { createContext, useReducer } from 'react'

export const NoteContext = createContext()

const noteReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return (
                {
                    text: action.text,
                    id: action.id,
                }
            )
        case 'HIDE':
            return (
                initialNote
            )
        default:
            return state
    }
}

const initialNote = {
    text: null,
    id: null,
}

export const NoteContextProvider = (props) => {
    const [note, noteDispatch] = useReducer(noteReducer, initialNote)
    return (
        <NoteContext.Provider value={[note, noteDispatch]}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default noteReducer
