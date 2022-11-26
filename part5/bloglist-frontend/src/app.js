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

    // REWORK LATER, THIS FETCHES ALL BLOGS FROM SERVER ON ADDED LIKE
    // Passed all the way down to App>Blog>Details to re-render when adding a like
    const rerender = () => {
        blogService.getAll()
            .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))}

    useEffect(() => {
        blogService.getAll()
            .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
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
                {
                    blogs
                        .map(blog => <Blog
                            key={blog.id}
                            blog={blog}
                            rerender={rerender}/>)
                }
            </div>
        )
    }
}

export default App