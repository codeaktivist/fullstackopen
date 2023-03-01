import axios from 'axios'
import { useQuery } from 'react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdotesList from './components/AnecdotesList'

const App = () => {
    const result = useQuery('anecdotes', () => axios
        .get('http://localhost:3001/anecdotes')
        .then(res => res.data),
        {
            refetchOnWindowFocus: false,
            retry: 1
        })

    if (result.isLoading) {
        return <div>loading data ...</div>
    }

    if (result.isError) {
        return <div>server problems</div>
    }

    const anecdotes = result.data

    return (
        <div>
            <h3>Anecdote app</h3>
            <Notification />
            <AnecdoteForm />
            <AnecdotesList anecdotes={anecdotes} />
        </div>
    )
}

export default App
