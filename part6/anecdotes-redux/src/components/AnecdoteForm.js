import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (e) => {
        e.preventDefault()
        const anecdoteToAdd = e.target.newAnecdote.value
        e.target.newAnecdote.value = ''
        dispatch(newAnecdote(anecdoteToAdd))
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name='newAnecdote' /></div>
            <button>create</button>
        </form>
    )
}

export default AnecdoteForm