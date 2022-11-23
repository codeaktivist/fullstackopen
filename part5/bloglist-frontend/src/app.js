import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Logout from './components/Logout'
import blogService from './services/blogs'
import './index.css'


const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll()
            .then((blogs) => setBlogs(blogs))
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
                <Blogs blogs={blogs} />
            </div>
        )
    }


}

export default App