import { createSlice } from "@reduxjs/toolkit";

const initialState = 'No notification yet'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        newNotification(state, action){
            return 'A new Notification'
        }
    }
})

export const { newNotification: printNotification } = notificationSlice.actions
export default notificationSlice.reducer