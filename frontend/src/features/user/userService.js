import axios from 'axios'

const API_URL = '/api/users/'

//Update user session
const updateUser = async (userId, userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL + userId, userData, config)


    return response.data
}

const userService = {
    updateUser
}

export default userService