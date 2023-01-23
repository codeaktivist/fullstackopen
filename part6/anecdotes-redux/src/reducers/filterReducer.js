import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keyword: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterFor(state, action){
            return {
                keyword: action.payload
            }
        }
    }

})

export const { filterFor } = filterSlice.actions
export default filterSlice.reducer