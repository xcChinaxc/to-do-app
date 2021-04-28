const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
// const authController = require('../controllers/auth')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    Landing page
// @route   GET /
router.get('/', homeController.getIndex) 

// @desc    Login/Login page
// @route   GET /
// router.get('/login', authController.getLogin) // create auth controller and method

// @desc    Login/Login page
// @route   POST /
// router.post('/login', authController.postLogin) // create auth controller and method

// @desc    Login/Logout page
// @route   GET /
// router.get('/logout', authController.logout) // create auth controller and method

// @desc    Login/SignUp page
// @route   GET /
// router.get('/signup', authController.getSignup) // create auth controller and method

// @desc    Login/SignUp page
// @route   POST /
// router.post('/signup', authController.postSignup) // create auth controller and method

module.exports = router