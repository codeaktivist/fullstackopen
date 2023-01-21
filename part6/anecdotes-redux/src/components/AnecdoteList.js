import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const notification = useSelector(state => state.notification)

    const vote = (id) => {
        dispatch(voteAnecdote(id))

        clearTimeout(notification.timeoutId)

        const timeoutId = setTimeout(() => {
            dispatch(hideNotification())
        }, 2000);

        dispatch(setNotification({
            message: 'You voted for ' + id,
            timeoutId
        }))
    }

    return (
        anecdotes.map(a =>
            <div key={a.id}>
                <div>
                    {a.content}
                </div>
                <div>
                    has {a.votes}
                    <button onClick={() => vote(a.id)}>vote</button>
                </div>
            </div>
        )
    )
}

export default AnecdoteList