const Notification = (props) => {
    return (
        <div className={`notification ${props.type}`}>
            {props.text}
        </div>
    )
}

export default Notification