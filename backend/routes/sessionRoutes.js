const express = require('express')
const router = express.Router()
const {
    getSessions, 
    setSession, 
    updateSession, 
    deleteSession
} = require('../controllers/sessionController')

router.route('/').get(getSessions).post(setSession)
router.route('/:id').put(updateSession).delete(deleteSession)

module.exports = router