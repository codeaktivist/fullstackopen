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

export const { voteAnecdote, appendAnecdote, setAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const notes = await noteService.getAll()
        dispatch(setAnecdote(notes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await noteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteForAnecdote = id => {
    return async dispatch => {
        const votedAnectode = await noteService.updateAnecdote(id)
        dispatch(voteAnecdote(votedAnectode.id))
    }
}

export default anecdoteSlice.reducer