import { useDispatch, useSelector } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)

    const addAnecdote = (e) => {
        e.preventDefault()
        const anecdoteToAdd = e.target.newAnecdote.value
        e.target.newAnecdote.value = ''
        dispatch(newAnecdote(anecdoteToAdd))

        clearTimeout(notification.timeoutId)

        const timeoutId = setTimeout(() => {
            dispatch(hideNotification())
        }, 2000);

        dispatch(setNotification({
            message: 'Added: ' + anecdoteToAdd,
            timeoutId
        }))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='newAnecdote' /></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm