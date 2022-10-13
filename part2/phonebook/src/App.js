import { useState } from 'react'


const App = () => {
    const [person, setPerson] = useState(['Martin'])
    const [newName, setNewName] = useState('')

    const onChangeHandler = (event) =>
        setNewName(event.target.value)

    const onSubmitHandler = (event) => {
        event.preventDefault()
        person.includes(newName) ? alert(`${newName} is already in the phonebook`) : setPerson(person.concat(newName))
        setNewName('')
    }

    return (
    <>
    <h2>Phonebook</h2>
    <form onSubmit={onSubmitHandler}>
        <input
            value={newName}
            onChange={onChangeHandler}/>
        <button type='submit'>Add</button>
    </form>
    <h2>Numbers</h2>
    <table>
        <tbody>
            {person.map((person) => <tr key={person}><td>{person}</td></tr>)}
        </tbody>
    </table>
    </>
)}

export default App