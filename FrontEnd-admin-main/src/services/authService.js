import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL

const login = async credentials => {
    const url = baseURL + '/login'

    try {
        const { data } = await axios.post(url, credentials)
        return data
    } catch (error) {
        if (!error.response)
            throw error

        const { data, status } = error.response
        throw { data, status }
    }
}

const logout = async _ => {
    const url = baseURL + '/logout'
    const token = localStorage.getItem('token')

    try {
        const { data } = await axios.post(url, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        if (!error.response)
            throw error

        const { data, status } = error.response
        throw { data, status }
    }
}

const verify = _ => {
    //
}

export default { login, logout, verify }