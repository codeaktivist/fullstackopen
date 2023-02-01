import axios from 'axios'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
    const queryClient = useQueryClient()
    const voteMutation = useMutation(anecdote =>
        axios
            .patch('http://localhost:3001/anecdotes/' + anecdote.id,
                {
                    votes: anecdote.votes + 1
                })
            .then(res => res.data), {
        onSuccess: () => queryClient.invalidateQueries('anecdotes')
    })

    const handleVote = (anecdote) => {
        voteMutation.mutate(anecdote)
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
