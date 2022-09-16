const asyncHandler = require('express-async-handler')

const Session = require('../model/sessionsModel')
const User = require('../model/userModel')

// @desc Get sessions
// @route GET /api/sessions
//@access Private
const getSessions = asyncHandler (async (req, res) => {
const sessions = await Session.find({ user: req.user.id })

    res.status(200).json(sessions)
})

// @desc Set sessions
// @route POST /api/sessions
//@access Private
const setSession = asyncHandler( async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Add a text field')
    }

    const session = await Session.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(session)
})
// @desc Update sessions
// @route PUT /api/sessions/:id
//@access Private
const updateSession = asyncHandler( async (req, res) => {
    const session = await Session.findById(req.params.id)

    if(!session){
        res.status(400)
        throw new Error('Session not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user){
        res.status(401)
        throw new Error ('User not found')
    }

    // Make sure the logged in user matches the session user
    if(session.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedSession = await Session.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedSession)
})
// @desc Delete sessions
// @route DELETE /api/sessions/:id
//@access Private
const deleteSession = asyncHandler( async (req, res) => {
    const session = await Session.findById(req.params.id)

    if(!session){
        res.status(400)
        throw new Error('Session not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user){
        res.status(401)
        throw new Error ('User not found')
    }

    // Make sure the logged in user matches the session user
    if(session.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    await session.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = 
{
    getSessions,
    setSession,
    updateSession,
    deleteSession

}