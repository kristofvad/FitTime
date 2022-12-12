import axios from 'axios'

const API_URL = 'api/sessions/'


//Create new session
const createSession = async (sessionData,  token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, sessionData, config)


    return response.data
}
//get user sessions
const getSessions = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)


    return response.data
}

//Delete user session
const deleteSession = async (sessionId,  token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + sessionId, config)


    return response.data
}

//Update user session
const updateSession = async (sessionId, sessionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL + sessionId, sessionData, config)


    return response.data
}

const sessionService = {
    createSession,
    getSessions,
    deleteSession,
    updateSession
}

export default sessionService