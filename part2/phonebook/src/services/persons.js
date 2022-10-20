import axios from 'axios'

const create = (newPerson) => {
    return (
        axios
            .post('http://localhost:3001/persons/', newPerson)
            .then(response => response.data)
    )
}

const erase = (id) => {
    console.log('erase: ', id)
    return (
        axios
            .delete(`http://localhost:3001/persons/${id}`)
            .then(response => response)
    )
}

// const create = (newPerson) => {
//     const request = axios.post('http://localhost:3001/persons/', newPerson)
//     return request.then(response => response.data)
// }

export default {create, erase}