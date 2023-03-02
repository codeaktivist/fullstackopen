import axios from 'axios'
import { useQueryClient, useMutation } from 'react-query'
import { useContext } from 'react'
import { NoteContext } from "../NoteContext"

const AnecdoteForm = () => {
    const [note, noteDispatch] = useContext(NoteContext)
    const queryClient = useQueryClient()
    const createMutation = useMutation(content => {
        return axios
            .post('http://localhost:3001/anecdotes',
                {
                    content,
                    votes: 0
                })
            .then(res => {
                return res.data
            })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
        },
        onError: () => {
            clearTimeout(note.id)
            const timeoutId = setTimeout(() => noteDispatch({ type: 'HIDE' }), 5000)

            noteDispatch({
                type: 'SHOW',
                text: 'Too short, must have a length of five',
                id: timeoutId,
            })
        },
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        createMutation.mutate(content)

        clearTimeout(note.id)
        const timeoutId = setTimeout(() => noteDispatch({ type: 'HIDE' }), 5000)

        noteDispatch({
            type: 'SHOW',
            text: 'Created new: ' + content,
            id: timeoutId,
        })
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
