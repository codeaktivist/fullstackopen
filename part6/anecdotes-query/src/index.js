import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import { NoteContextProvider } from './NoteContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <NoteContextProvider>
            <App />
        </NoteContextProvider>
    </QueryClientProvider>
)
