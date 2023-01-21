import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    content: 'Empty',
    visible: false,
    timeoutId: null
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action){
            return {
                content: action.payload.message,
                visible: true,
                timeoutId: action.payload.timeoutId
            }
        },
        hideNotification(state, action){
            return {
                ...state,
                visible: false
            }
        }
    }
})

export const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer