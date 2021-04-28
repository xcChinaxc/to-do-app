const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    Landing page
// @route   GET /
router.get('/', homeController.getIndex) 

module.exports = router