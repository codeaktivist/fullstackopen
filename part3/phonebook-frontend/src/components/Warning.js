const Warning = ({message}) => {
    if (message === null)
        return null
    else
    {
        return (
            <div className='warning'>{message}</div>
        )
    }
}
 export default Warning