const Table = ({person, search, setPerson, setNotification, setWarning, personService }) => {
    const deleteHandler = (pers) => () => {
        if(window.confirm(`Delete ${pers.name} from the phonebook?`))
        {
            personService.erase(pers.id)
                .then((result) => {
                    setPerson(person.filter(p => p.id !== pers.id))
                    setNotification(`${pers.name} deleted`)
                    setTimeout(() => setNotification(null), 2000)
                })
                .catch((err) => {
                    setPerson(person.filter(p => p.id !== pers.id))
                    setWarning(`${pers.name} was already deleted!`)
                    setTimeout(() => setWarning(null), 2000)
                })
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

export default Table