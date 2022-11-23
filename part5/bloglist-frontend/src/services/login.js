import axios from 'axios'
const baseUrl = '/api/login'

const loginUser = async ({ username, password }) => {
    try {
        const result = await axios
            .post(baseUrl, { username, password })

        if (result.data && result.data.token) {
            window.localStorage.setItem('user', JSON.stringify(result.data))
        }

        return result.data
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export default { loginUser }