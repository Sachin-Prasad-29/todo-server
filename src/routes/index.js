const { Router } = require('express');
const {
    getAllTodo,
    createTodo,
    getTodoById,
    updateTodoById,
    deleteTodoById
} = require('../controller/todo.controller');
const authenticate = require('../middleware/auth');
const { login, register } = require('../controller/user.controller');
const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/todo', authenticate, getAllTodo);
router.post('/todo', authenticate, createTodo);
router.get('/todo/:id', authenticate, getTodoById);
router.patch('/todo/:id', authenticate, updateTodoById);
router.delete('/todo/:id', authenticate, deleteTodoById);

module.exports = router;
