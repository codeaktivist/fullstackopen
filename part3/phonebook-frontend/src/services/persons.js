import axios from 'axios'

const baseUrl = '/api/persons'

const create = (newPerson) => {
    return (
        axios
            .post(baseUrl, newPerson)
            .then(response => response.data)
    )
}

const update = (updatedPerson) => {
    console.log('update: ', updatedPerson.id)
    return (
        axios
            .put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
            .then(response => response.data)
    )
}

const erase = (id) => {
    console.log('erase: ', id)
    return (
        axios
            .delete(`${baseUrl}/${id}`)
            .then(response => response)
    )
}

const exportObject = {create, update, erase}

export default exportObject