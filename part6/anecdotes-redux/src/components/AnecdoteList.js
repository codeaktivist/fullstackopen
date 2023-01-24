import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const vote = (anecdote) => {
        dispatch(voteForAnecdote(anecdote.id))
        dispatch(newNotification(`Voted for: ${anecdote.content}`, 3))
    }

    return (
        anecdotes
            .filter(a => a.content.includes(filter.keyword))
            .map(a =>
            <div key={a.id}>
                <div>
                    {a.content}
                </div>
                <div>
                    has {a.votes}
                    <button onClick={() => vote(a)}>vote</button>
                </div>
            </div>
        )
    )
}

export default AnecdoteList