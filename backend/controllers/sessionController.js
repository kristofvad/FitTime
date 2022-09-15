const asyncHandler = require('express-async-handler')

const Session = require('../model/sessionsModel')

// @desc Get sessions
// @route GET /api/sessions
//@access Private
const getSessions = asyncHandler (async (req, res) => {
const sessions = await Session.find()

    res.status(200).json(Session)
})

// @desc Set sessions
// @route POST /api/sessions
//@access Private
const setSession = asyncHandler( async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Add a text field')
    }

res.status(200).json({ message: 'Set Session'})
})
// @desc Update sessions
// @route PUT /api/sessions/:id
//@access Private
const updateSession = asyncHandler( async (req, res) => {
    res.status(200).json({message: `Update session ${req.params.id}`})
})
// @desc Delete sessions
// @route DELETE /api/sessions/:id
//@access Private
const deleteSession = asyncHandler( async (req, res) => {
    res.status(200).json({message: `Delete session ${req.params.id}`})
})

module.exports = 
{
    getSessions,
    setSession,
    updateSession,
    deleteSession

}