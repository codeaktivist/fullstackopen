import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    const noneExisting = {
        content: "Another new note with modified Put handler",
        date: "2022-10-18T08:32:59.700Z",
        id: 1000,
        important:true        
    }

    return request.then(response => response.data.concat(noneExisting))
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request
        .then(response => response.data)
}


const exports = { getAll, create, update}
export default exports