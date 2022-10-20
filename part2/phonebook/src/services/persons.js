import axios from 'axios'

const create = (newPerson) => {
    return (
        axios
            .post('http://localhost:3001/persons/', newPerson)
            .then(response => response.data)
    )
}

// const create = (newPerson) => {
//     const request = axios.post('http://localhost:3001/persons/', newPerson)
//     return request.then(response => response.data)
// }

export default {create: create}