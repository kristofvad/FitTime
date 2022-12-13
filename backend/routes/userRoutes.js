const express = require('express')
const router = express.Router()
const { registerUser,
        loginUser,
        updateUser,
        getMe} = require('../controllers/userController')      
const {protect} = require('../middleware/authMiddleware')

router.post('', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.route('/:id').put(protect, updateUser)

module.exports = router