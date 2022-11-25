import { useState } from 'react'
import loginService from '../services/login'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const loginHandler = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.loginUser({ username: username, password: password })
            if (user && user.token) {
                props.setUser(user)
            }
        } catch (error) {
            props.setNotification({
                type: 'warning',
                text: error.response.data.error
            })
            setTimeout(() => props.setNotification(null), 3000)
        } finally {
            setUsername('')
            setPassword('')
        }

    }

    return (
        <form onSubmit={loginHandler}>
            <div>
                Username:
                <input
                    type='text'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}>
                </input>
            </div>
            <div>
                Password:
                <input
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}></input>
            </div>
            <p>
                <button type='submit'>Login</button>
            </p>
        </form>
    )
}

export default Login