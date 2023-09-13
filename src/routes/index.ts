import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateRequest, requireAuth, currentUser } from '@skptickets/common';
import { signup, signin, currentuser, signout } from '../handler/user.handler';
import {
    getAllTodo,
    createTodo,
    getTodoById,
    updateTodoById,
    deleteTodoById
} from '../handler/todo.handler';

const router = express.Router();

router.post(
    '/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('name').isString().withMessage('Name must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,
    signup
);

router.post('/api/users/signout', signout);

router.post(
    '/api/users/signin',
    [
        body('email').isEmail().withMessage('Email Must be Valid'),
        body('password').trim().notEmpty().withMessage('You must supply a password')
    ],
    validateRequest,
    signin
);

router.get('/api/users/currentuser', currentUser, currentuser);

router.post(
    '/api/todos',
    currentUser,
    requireAuth,
    [body('title').not().isEmpty().withMessage('Title is required')],
    validateRequest,
    createTodo
);

router.get('/api/todos', currentUser, requireAuth, getAllTodo);

router.get('/api/todos/:id', currentUser, requireAuth, getTodoById);

router.patch('/api/todos/:id', currentUser, requireAuth, [], validateRequest, updateTodoById);

router.delete('/api/todos/:id', currentUser, requireAuth, deleteTodoById);

export { router as apiRouter };
