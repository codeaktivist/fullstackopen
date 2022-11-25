import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Toggleable from './components/Toggleable'
import Create from './components/Create'
import Logout from './components/Logout'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './index.css'

const App = () => {
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState(null)

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

    const toggleRef = useRef()

    if (user === null) {
        return(
            <div>
                <h1>Please log in</h1>
                {notification === null || <Notification
                    type={notification.type}
                    text={notification.text}/>}
                <Login
                    user={user}
                    setUser={setUser}
                    setNotification={setNotification}/>
            </div>
        )
    } else {
        return(
            <div>
                <h1>Bloglist</h1>
                {notification === null || <Notification
                    type={notification.type}
                    text={notification.text}/>}
                <Logout setUser={setUser} />
                <p>Logged-in as {user.name}</p>
                <Toggleable ref={toggleRef}>
                    <Create
                        user={user}
                        blogs={blogs}
                        setBlogs={setBlogs}
                        setNotification={setNotification}
                        toggleRef={toggleRef}/>
                </Toggleable>
                <h2>Blogs in Database</h2>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            </div>
        )
    }
}

export default App