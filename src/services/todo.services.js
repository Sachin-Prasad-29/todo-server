const Todo = require('../model/todo.model');

const getAlltodoSrv = async (userEmail) => {
    try {
        const allTodos = await Todo.find({ userEmail: userEmail });
        if (!allTodos) {
            throw new Error('No Todo Found');
        }
        return allTodos;
    } catch (error) {
        throw error;
    }
};

const createTodoSvc = async (todoDetails) => {
    try {

        const insertedTodo = await Todo.create(todoDetails);

        if (!insertedTodo) {
            throw new Error('Something went wrong !');
        }
        return insertedTodo;
    } catch (error) {
        throw error;
    }
};

const getTodoByIdSvc = async (id) => {
    try {
        const allTodos = await Todo.find({ _id: id });
        if (!allTodos) {
            throw new Error('No Todo Found');
        }
        return allTodos;
    } catch (error) {
        throw error;
    }
};
const updateTodoByIdSvc = async (todoId, todoDetails) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            { _id: todoId },
            todoDetails,
            {
                new: true,
                runValidators: true
            }
        );
        if (!updatedTodo) {
            throw new Error('Something went wrong !');
        }
        return updatedTodo;
    } catch (error) {
        throw error;
    }
};
const deleteTodoByIdSvc = async (todoId) => {
    try {
        const deletedTodoDetails = await Todo.findByIdAndDelete({
            _id: todoId
        });
        if (!deletedTodoDetails) {
            throw new Error(`No Todo Found with Given Id`);
        }

        return deletedTodoDetails;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAlltodoSrv,
    createTodoSvc,
    getTodoByIdSvc,
    updateTodoByIdSvc,
    deleteTodoByIdSvc
};
