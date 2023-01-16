import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const vote = (id) => {
        dispatch(voteAnecdote(id))
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