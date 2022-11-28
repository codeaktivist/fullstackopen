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

const addLike = async (likedBlog) => {
    try {
        await axios
            .put(`${baseUrl}/${likedBlog.id}`, likedBlog)
    } catch (error) {
        console.log(error)
    }
}

const remove = async (deletedBlog, token) => {
    const config = {
        headers: { 'Authorization': `bearer ${token}` }
    }

    try {
        await axios
            .delete(`${baseUrl}/${deletedBlog}`, config)
    } catch (error) {
        console.log(error)
    }
}

export default { getAll, create, addLike, remove }