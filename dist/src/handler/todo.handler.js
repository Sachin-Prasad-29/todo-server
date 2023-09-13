"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoById = exports.updateTodoById = exports.getTodoById = exports.createTodo = exports.getAllTodo = void 0;
const todo_model_1 = require("../model/todo.model");
const common_1 = require("@skptickets/common");
const getAllTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todo_model_1.Todo.find({ userId: req.currentUser.id });
    res.send(todos);
});
exports.getAllTodo = getAllTodo;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const todo = todo_model_1.Todo.build({
        title,
        userId: req.currentUser.id
    });
    yield todo.save();
    res.status(201).send(todo);
});
exports.createTodo = createTodo;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check here whether the user and the todo userId are same
    const todo = yield todo_model_1.Todo.findById(req.params.id);
    if (!todo) {
        throw new common_1.NotFoundError();
    }
    res.send(todo);
});
exports.getTodoById = getTodoById;
const updateTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield todo_model_1.Todo.findById(req.params.id);
    if (!todo) {
        throw new common_1.NotFoundError();
    }
    if (todo.userId !== req.currentUser.id) {
        throw new common_1.NotAuthorizedError();
    }
    todo.set(req.body);
    yield todo.save();
    res.send(todo);
});
exports.updateTodoById = updateTodoById;
const deleteTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check here whether the user and the todo userId are same
    const todo = yield todo_model_1.Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
        throw new common_1.NotFoundError();
    }
    res.send(todo);
});
exports.deleteTodoById = deleteTodoById;
