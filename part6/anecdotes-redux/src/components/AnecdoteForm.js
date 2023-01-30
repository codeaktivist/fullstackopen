import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.newAnecdote.value
        e.target.newAnecdote.value = ''
        props.createAnecdote(content)
        props.newNotification(`Added: ${content}`, 3)
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

const ConnectedComponent = connect(
    null,
    { createAnecdote, newNotification }
)(AnecdoteForm)

export default ConnectedComponent