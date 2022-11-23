const Logout = (props) => {
    const logoutHandler = () => {
        window.localStorage.removeItem('user')
        props.setUser(null)
    }

    return(
        <div>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default Logout