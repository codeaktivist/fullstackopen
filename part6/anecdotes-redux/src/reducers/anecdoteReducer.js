import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const sortByVotes = (a) => {
    return a.sort((a, b) => b.votes - a.votes)
}

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        newAnecdote(state, action) {
            state.push({
                content: action.payload,
                id: getId(),
                votes: 0
            })
            return sortByVotes(state)
        },
        voteAnecdote(state, action) {
            const anecdoteToVote = state.find(a => a.id === action.payload)
            const anecdoteVoted = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1
            }
            return sortByVotes(state.map(a => a.id === action.payload ? anecdoteVoted : a))
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        }
    }
})

export const { newAnecdote, voteAnecdote, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer