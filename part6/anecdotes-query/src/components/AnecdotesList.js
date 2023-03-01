import axios from 'axios'
import { useQueryClient, useMutation } from 'react-query'
import { useContext } from 'react'
import { NoteContext } from "../NoteContext"


const AnecdotesList = ({ anecdotes }) => {
    const [note, noteDispatch] = useContext(NoteContext)
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

        clearTimeout(note.id)
        const timeoutId = setTimeout(() => noteDispatch({ type: 'HIDE' }), 5000)

        noteDispatch({
            type: 'SHOW',
            text: 'Voted for: ' + anecdote.content,
            id: timeoutId,
        })
    }

    return (
        <div>
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

export default AnecdotesList
