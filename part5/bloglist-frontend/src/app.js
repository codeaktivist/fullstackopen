import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Create from './components/Create'
import Logout from './components/Logout'
import blogService from './services/blogs'
import './index.css'

const emptyBlog = {
    title: '',
    author: '',
    url: ''
}

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [newBlog, setNewBlog] = useState(emptyBlog)

    useEffect(() => {
        blogService.getAll()
            .then((blogs) => setBlogs(blogs))
    },[])

    useEffect(() => {
        const storedUser = window.localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    },[])

    if (user === null) {
        return(
            <div>
                <h1>Please log in</h1>
                <Login
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    user={user}
                    setUser={setUser}/>
            </div>
        )
    } else {
        return(
            <div>
                <h1>Bloglist</h1>
                <Logout setUser={setUser} />
                <p>Logged-in as {user.name}</p>
                <Create
                    newBlog={newBlog}
                    setNewBlog={setNewBlog}
                    user={user}
                    blogs={blogs}
                    setBlogs={setBlogs}
                    emptyBlog={emptyBlog}/>
                <h2>Blogs in Database</h2>
                <Blogs blogs={blogs} />
            </div>
        )
    }
}

export default App