"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const common_1 = require("@skptickets/common");
const user_handler_1 = require("../handler/user.handler");
const todo_handler_1 = require("../handler/todo.handler");
const router = express_1.default.Router();
exports.apiRouter = router;
router.post('/api/users/signup', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email must be valid'),
    (0, express_validator_1.body)('name').isString().withMessage('Name must be valid'),
    (0, express_validator_1.body)('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
], common_1.validateRequest, user_handler_1.signup);
router.post('/api/users/signout', user_handler_1.signout);
router.post('/api/users/signin', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email Must be Valid'),
    (0, express_validator_1.body)('password').trim().notEmpty().withMessage('You must supply a password')
], common_1.validateRequest, user_handler_1.signin);
router.get('/api/users/currentuser', common_1.currentUser, user_handler_1.currentuser);
router.post('/api/todos', common_1.currentUser, common_1.requireAuth, [(0, express_validator_1.body)('title').not().isEmpty().withMessage('Title is required')], common_1.validateRequest, todo_handler_1.createTodo);
router.get('/api/todos', common_1.currentUser, common_1.requireAuth, todo_handler_1.getAllTodo);
router.get('/api/todos/:id', common_1.currentUser, common_1.requireAuth, todo_handler_1.getTodoById);
router.patch('/api/todos/:id', common_1.currentUser, common_1.requireAuth, [], common_1.validateRequest, todo_handler_1.updateTodoById);
router.delete('/api/todos/:id', common_1.currentUser, common_1.requireAuth, todo_handler_1.deleteTodoById);
