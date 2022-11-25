import { useState } from 'react'
import noteService from '../services/notes'
import loginService from '../services/login'

const LoginForm = ({ setUser, setErrorMessage }) => {

    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
  
    const handleUsernameChange = ({ target }) => setUsername(target.value)
    const handlePasswordChange = ({ target }) => setPassword(target.value)

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const user = await loginService({ username, password })
            
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
    
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            console.log(user)
        } catch (error) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
      }

    return(
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>

    )
}

export default LoginForm