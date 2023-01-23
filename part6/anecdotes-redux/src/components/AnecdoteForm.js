import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.newAnecdote.value
        e.target.newAnecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))

        clearTimeout(notification.timeoutId)

        const timeoutId = setTimeout(() => {
            dispatch(hideNotification())
        }, 2000);

        dispatch(setNotification({
            message: 'Added: ' + content
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