import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

import noteService from './services/anecdotes'
import { appendAnecdote } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        noteService.getAll().then(notes => {
            notes.map(note =>
                dispatch(appendAnecdote(note))
            )
        })
    }, [dispatch])

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App