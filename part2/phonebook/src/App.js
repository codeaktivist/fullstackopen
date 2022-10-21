import { useState, useEffect } from 'react'
import axios from 'axios'

import personService from './services/persons'
import './index.css'

const Search = ({ search, onChangeSearchHandler }) => {
    return (
        <div>
            Search for: <input
            value={search}
            onChange={onChangeSearchHandler}/>
        </div>
    )
}

const Table = ({person, search, setPerson, setNotification, setWarning }) => {
    const deleteHandler = (pers) => () => {
        if(window.confirm(`Delete ${pers.name} from the phonebook?`))
        {
            personService.erase(pers.id)
                // .then(() => setPerson(person.filter(p => p.id !== pers.id)))
                .catch((err) => {
                    setWarning(`${pers.name} was already deleted!`)
                    setTimeout(() => setWarning(null), 2000)
                })
                .finally(() => setPerson(person.filter(p => p.id !== pers.id)))
            }
        }
    console.log(person)
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
                        <td><button onClick={deleteHandler(person)}>delete</button></td>
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

const Notification = ({message}) => {
    if (message === null)
        return null
    else
    {
        return (
            <div className='notification'>{message}</div>
        )
    }
}

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

const App = () => {
    const [person, setPerson] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [notification, setNotification] = useState(null)
    const [warning, setWarning] = useState(null)

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
        const personObject = {
            name: newName,
            number: newNumber            
        }
        if (person.some(p => p.name === newName))
        {
            if (window.confirm(`${newName} is already in the phonebook! \nReplace the old number with this one?`))
            {
                personService
                    .update({...person.find(p => p.name === newName), number: newNumber})
                    .then(response => {
                        setPerson(person.map(p => p.id === response.id ? response : p))
                        setNotification(`Number for ${response.name} updated`)
                        setTimeout(() => setNotification(null), 2000)
                    })
            }
        }
        else
        {
            personService
                .create(personObject)
                .then(newPerson => {
                    console.log('newPerson: ', newPerson)
                    setPerson(person.concat(newPerson))
                    setNotification(`${newPerson.name} was added.`)
                    setTimeout(() => setNotification(null), 2000)
                })
        }
        setNewName('')
        setNewNumber('')                
    }
    

    return (
    <>
        <h1>Phonebook</h1>
        <Notification message={notification} />
        <Warning message={warning} />
        <Search
            search={search}
            onChangeSearchHandler={onChangeSearchHandler}
        />
        <h2>Add new</h2>
        <Form 
            onSubmitHandler={onSubmitHandler}
            onChangeNameHandler={onChangeNameHandler}
            newName={newName}
            newNumber={newNumber}
            onChangeNumberHandler={onChangeNumberHandler}
        />
        <h2>Numbers</h2>
        <Table
            person={person}
            search={search}
            setPerson={setPerson}
            setWarning={setWarning}
        />
    </>
)}

export default App