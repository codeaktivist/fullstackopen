import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/anecdotes'

const initialState = []

const sortByVotes = (a) => {
    return a.sort((a, b) => b.votes - a.votes)
}

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        createAnecdote(state, action) {
            state.push(action.payload)
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
        },
        setAnecdote(state, action) {
            return action.payload
        }
    }
})

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const notes = await noteService.getAll()
        dispatch(setAnecdote(notes))
    }
}

export default anecdoteSlice.reducer