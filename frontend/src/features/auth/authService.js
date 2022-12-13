import axios from 'axios'

const API_URL = '/api/users/'

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const updateUser = async (userId, userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL + userId, userData, config)


    return response.data
}

//Logout user
const logout = () => {
    localStorage.removeItem('user')
  }

const isAuthIssue = (err) => {
    return true
}

const authService = {
    register,
    logout,
    login,
    isAuthIssue,
    //updateUser,
}

export default authService