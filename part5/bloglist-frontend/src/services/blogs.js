import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
    try {
        const response = await axios
            .get(baseUrl)

        return response.data
    } catch (error) {
        console.log(error)
    }
}

const create = async (newBlog) => {
    const config = {
        headers: { 'Authorization': `bearer ${newBlog.token}` }
    }

    try {
        const response = await axios
            .post(baseUrl, newBlog, config)

        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export default { getAll, create }