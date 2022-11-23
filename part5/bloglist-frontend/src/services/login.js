import axios from 'axios'
const baseUrl = '/api/login'

const loginUser = async ({ username, password }) => {
    try {
        const result = await axios
            .post(baseUrl, { username, password })

        return result.data
    } catch (error) {
        console.log('ERROR', error)
        throw (error)
    }
}

export default { loginUser }