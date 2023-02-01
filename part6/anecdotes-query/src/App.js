import axios from 'axios'
import { useQuery } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

    const handleVote = (anecdote) => {
        console.log('vote')
    }

    const result = useQuery('anecdotes', () => axios
        .get('http://localhost:3001/anecdotes')
        .then(res => res.data),
        {
            retry: 1
        })

    if (result.isLoading) {
        console.log(result);
        return (
            <div>loading data ...</div>
        )
    }

    if (result.isError) {
        console.log(result);
        return (
            <div>server problems</div>
        )
    }

    const anecdotes = result.data

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
