const Logout = (props) => {
    return(
        <div>
            <button onClick={() => props.setUser(null)}>Logout</button>
        </div>
    )
}

export default Logout