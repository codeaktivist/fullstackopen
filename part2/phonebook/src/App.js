import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({ search, onChangeSearchHandler }) => {
    return (
        <div>
            Search for: <input
            value={search}
            onChange={onChangeSearchHandler}/>
        </div>
    )
}

const Table = ({person, search }) => {
    return(
        <table>
        <tbody>
            {person.map((person) => {
                if (person.name.search(RegExp(search, 'i')) > -1)
                {
                return(
                    <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                    </tr>)}
                return true
            })}
        </tbody>
    </table>
    )
}

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

const App = () => {
    const [person, setPerson] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(response => setPerson(response.data))
    },[])

    const onChangeNameHandler = (event) =>
        setNewName(event.target.value)

    const onChangeNumberHandler = (event) =>
        setNewNumber(event.target.value)

    const onChangeSearchHandler = (event) => 
        setSearch(event.target.value)

    const onSubmitHandler = (event) => {
        event.preventDefault()
        person.some((person) => person.name === newName) 
            ? alert(`${newName} is already in the phonebook`) 
            : axios
                .post('http://localhost:3001/persons/', {
                name: newName,
                number: newNumber
                })
                .then(response => {
                    setPerson(person.concat(response.data))
                })
        
        setNewName('')
        setNewNumber('')
    }

    return (
    <>
        <h2>Phonebook</h2>
        <Search
            search={search}
            onChangeSearchHandler={onChangeSearchHandler}
        />
        <h3>Add new</h3>
        <Form 
            onSubmitHandler={onSubmitHandler}
            onChangeNameHandler={onChangeNameHandler}
            newName={newName}
            newNumber={newNumber}
            onChangeNumberHandler={onChangeNumberHandler}
        />
        <h3>Numbers</h3>
        <Table
            person={person}
            search={search}
        />
    </>
)}

export default App