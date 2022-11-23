import axios from 'axios'
const baseUrl = '/api/login'

const loginUser = async ({ username, password }) => {
    try {
        const result = await axios
            .post(baseUrl, { username, password })

        if (result.data && result.data.token) {
            window.localStorage.setItem('user', JSON.stringify(result.data))
            console.log(window.localStorage.getItem('user'))
        }

        return result.data
    } catch (error) {
        console.log('ERROR', error)
        throw (error)
    }
}

export default { loginUser }