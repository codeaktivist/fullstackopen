import loginService from '../services/login'

const Login = (props) => {
    const loginHandler = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.loginUser({ username: props.username, password: props.password })
            if (user && user.token) {
                props.setUser(user)
            }
        } catch (error) {
            alert(error.response.data.error)
        } finally {
            props.setUsername('')
            props.setPassword('')
        }

    }

    return (
        <form onSubmit={loginHandler}>
            <div>
                Username:
                <input
                    type='text'
                    value={props.username}
                    onChange={({ target }) => props.setUsername(target.value)}>
                </input>
            </div>
            <div>
                Password:
                <input
                    type='password'
                    value={props.password}
                    onChange={({ target }) => props.setPassword(target.value)}></input>
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>
    )
}

export default Login