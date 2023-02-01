import { useQueryClient, useMutation } from 'react-query'
import axios from 'axios'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const createMutation = useMutation(content => {
        axios
            .post('http://localhost:3001/anecdotes',
                {
                    content,
                    votes: 0
                })
            .then(res => res.data)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        createMutation.mutate(content)
        console.log('new anecdote')
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
