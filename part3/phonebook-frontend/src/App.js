import { useState, useEffect } from 'react'
import axios from 'axios'

import personService from './services/persons'
import './index.css'

import Search from './components/Search'
import Table from './components/Table'
import Form from './components/Form'
import Notification from './components/Notification'
import Warning from './components/Warning'

const baseUrl = '/api/persons'

const App = () => {
    const [person, setPerson] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [notification, setNotification] = useState(null)
    const [warning, setWarning] = useState(null)

    useEffect(() => {
        axios
            .get(baseUrl)
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
        if (person.some(p => p.name === newName)) {
            if (window.confirm(`${newName} is already in the phonebook! \nReplace the old number with this one?`)) {
                personService
                    .update({...person.find(p => p.name === newName), number: newNumber})
                    .then(response => {
                        setPerson(person.map(p => p.id === response.id ? response : p))
                        setNotification(`Number for ${response.name} updated`)
                        setTimeout(() => setNotification(null), 3000)
                    })
                    .catch(err => {
                        setWarning(err.response.data.error)
                        setTimeout(() => setWarning(null), 3000)
                    })
            }
        } else {
            personService
                .create(personObject)
                .then(newPerson => {
                    console.log('newPerson: ', newPerson)
                    setPerson(person.concat(newPerson))
                    setNotification(`${newPerson.name} was added.`)
                    setTimeout(() => setNotification(null), 3000)
                })
                .catch(err => {
                    console.log('Error: ', err.response.data.error);
                    setWarning(err.response.data.error)
                    setTimeout(() => setWarning(null), 3000)
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
            setNotification={setNotification}
            personService={personService}
        />
    </>
)}

export default App