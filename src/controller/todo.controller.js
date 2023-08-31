const {
    getAlltodoSrv,
    createTodoSvc,
    getTodoByIdSvc,
    updateTodoByIdSvc,
    deleteTodoByIdSvc
} = require('../services/todo.services');

const getAllTodo = async (req, res) => {
    try {
        return res.json(await getAlltodoSrv(res.locals.email));
    } catch (error) {
        console.error(error);
        res.status(404).json({ status: 'Failed', msg: error.message });
    }
};

const createTodo = async (req, res) => {
    try {
        return res.json(
            await createTodoSvc({
                title: req.body.title,
                userEmail: res.locals.email
            })
        );
    } catch (error) {
        console.error(error);
        res.status(404).json({ status: 'Failed', msg: error.message });
    }
};

const getTodoById = async (req, res) => {
    try {
        return res.json(await getTodoByIdSvc(req.params.id));
    } catch (error) {
        console.error(error);
        res.status(404).json({ status: 'Failed', msg: error.message });
    }
};

const updateTodoById = async (req, res) => {
    try {
        return res.json(await updateTodoByIdSvc(req.params.id, req.body));
    } catch (error) {
        console.error(error);
        res.status(404).json({ status: 'Failed', msg: error.message });
    }
};

const deleteTodoById = async (req, res) => {
    try {
        return res.json(await deleteTodoByIdSvc(req.params.id));
    } catch (error) {
        console.error(error);
        res.status(404).json({ status: 'Failed', msg: error.message });
    }
};

module.exports = {
    getAllTodo,
    createTodo,
    getTodoById,
    updateTodoById,
    deleteTodoById
};
