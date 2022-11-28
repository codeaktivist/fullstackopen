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
    const emptyBlog = {
        title: '',
        author: '',
        url: ''
    }

    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState(null)
    const [newBlog, setNewBlog] = useState(emptyBlog)


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

    const likeHandler = async (blog) => {
        const likedBlog = {
            ...blog,
            likes: blog.likes + 1,
        }

        setBlogs(blogs
            .map(b => b.id === likedBlog.id ? likedBlog : b)
            .sort((a, b) => b.likes - a.likes))

        await blogService.addLike(likedBlog)
    }

    const removeHandler = async (deletedBlog) => {
        if (window.confirm(`Remove blog: ${deletedBlog.title}`)) {
            setBlogs(blogs
                .filter((b) => b.id !== deletedBlog.id))

            await blogService.remove(deletedBlog.id, user.token)
        }
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        try {
            const response = await blogService.create({
                ...newBlog,
                token: user.token })
            if (response && response.data) {
                setBlogs(blogs.concat(response.data))
                setNotification({
                    type: 'info',
                    text: `Created: ${response.data.title}`
                })
                setTimeout(() => setNotification(null), 3000)
            }
        } catch (error) {
            setNotification({
                type: 'warning',
                text: error.response.data.error
            })
            setTimeout(() => setNotification(null), 3000)
        } finally {
            setNewBlog(emptyBlog)
            toggleRef.current.toggleVisible()
        }
    }

    // Reference to toggle visibility
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
                        submitHandler={submitHandler}
                        newBlog={newBlog}
                        setNewBlog={setNewBlog}/>
                </Toggleable>
                <h2>Blogs in Database</h2>
                {
                    blogs
                        .map(blog => <Blog
                            key={blog.id}
                            user={user}
                            blog={blog}
                            likeHandler={() => likeHandler(blog)}
                            removeHandler={() => removeHandler(blog)}/>)
                }
            </div>
        )
    }
}

export default App