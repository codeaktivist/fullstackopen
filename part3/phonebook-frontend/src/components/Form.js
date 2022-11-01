const Form = ({ onSubmitHandler, onChangeNameHandler, newName, onChangeNumberHandler, newNumber}) => {
    return(
        <form onSubmit={onSubmitHandler}>
            <div>
                name: <input
                    value={newName}
                    onChange={onChangeNameHandler}/>
            </div>
            <div>
                number: <input
                    value={newNumber}
                    onChange={onChangeNumberHandler}/>
            </div>
            <button type='submit'>Add</button>
        </form>
    )
}

export default Form