const express = require('express')
const router = express.Router()
const {
    getSessions, 
    setSession, 
    updateSession, 
    deleteSession
} = require('../controllers/sessionController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getSessions).post(protect, setSession)
router.route('/:id').put(protect, updateSession).delete(protect, deleteSession)

module.exports = router