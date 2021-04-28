const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    grab user todos
// @route   GET /
router.get('/', ensureAuth, todosController.getTodos)

// @desc    create todos
// @route   POST /
router.post('/createTodo', todosController.createTodo)

// @desc    mark todos complete
// @route   PUT /
router.put('/markComplete', todosController.markComplete)

// @desc    mark todos uncomplete
// @route   POST /
router.put('/markIncomplete', todosController.markIncomplete)

// @desc    delete todos
// @route   DELETE /
router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router