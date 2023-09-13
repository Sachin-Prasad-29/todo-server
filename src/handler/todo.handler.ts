import { Request, Response } from 'express';
import { Todo } from '../model/todo.model';
import { NotFoundError, NotAuthorizedError } from '@skptickets/common';
const getAllTodo = async (req: Request, res: Response) => {
    const todos = await Todo.find({ userId: req.currentUser!.id });
    res.send(todos);
};

const createTodo = async (req: Request, res: Response) => {
    const { title } = req.body;

    const todo = Todo.build({
        title,
        userId: req.currentUser!.id
    });
    await todo.save();

    res.status(201).send(todo);
};

const getTodoById = async (req: Request, res: Response) => {
    // check here whether the user and the todo userId are same
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        throw new NotFoundError();
    }
    res.send(todo);
};

const updateTodoById = async (req: Request, res: Response) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        throw new NotFoundError();
    }

    if (todo.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    todo.set(req.body);

    await todo.save();

    res.send(todo);
};

const deleteTodoById = async (req: Request, res: Response) => {
    // check here whether the user and the todo userId are same
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
        throw new NotFoundError();
    }
    res.send(todo);
};

export { getAllTodo, createTodo, getTodoById, updateTodoById, deleteTodoById };
