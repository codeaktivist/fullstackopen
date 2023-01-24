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
                content: action.payload.content,
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

export const newNotification = (content, durationInSeconds) => {
    return async (dispatch, getState) => {
        clearTimeout(getState().notification.timeoutId)
        // console.log(getState().notification.timeoutId)
        const timeoutId = setTimeout(() => {
            dispatch(hideNotification())
        }, durationInSeconds * 1000);
        const message = {
            content,
            timeoutId
        }

        dispatch(setNotification(message))
    }
}

export default notificationSlice.reducer