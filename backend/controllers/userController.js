const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

// @desc Register new user
// @route POST /api/users
//@access Public
const registerUser =  asyncHandler( async(req, res) => {
const { name, email, password} = req.body

if(!name || !email || !password){
    res.status(400)
    throw new Error('Please add all fields')
}

// Check if the user exists
const userExists = await User.findOne({email})

if(userExists){
    res.status(400)
    throw Error('User already exists')
}

// Hash password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

// Create user
const user = await User.create({
    name,
    email,
    password: hashedPassword
})

if(user){
    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    })
} else {
    res.status(400)
    throw new Error('Invalid user data')
}
})

// @desc Authenticate a user
// @route POST /api/users/login
//@access Public
const loginUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body

    //Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    if (jwt.TokenExpiredError) {
            generateToken = (id) => {
                return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d',})
            }
        }
})

// @desc Get user data
// @route GET /api/users/me
//@access Private
const getMe = asyncHandler( async(req, res) => {
    res.status(200).json(req.user)
})

// Generate a token(JWT)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d',})
}

// @desc Update users
// @route PUT /api/users/:id
//@access Private
const updateUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)
    const { name, email} = req.body

    if(!name || !email) {
        res.status(400)
        throw new Error('Add a text field')
    }

    if(!user){
        res.status(400)
        throw new Error('Session not found')
    }

    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error ('User not found')
    }

    // Make sure the logged in user matches the session user
    if(user.id.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedUser)
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUser
}