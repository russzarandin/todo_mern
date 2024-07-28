const Todo = require('../models/Todo');
const mongoose = require('mongoose');


// get all todos
const getTodos = async (req, res) => {
    //const todos = await Todo.find();
    const todos = await Todo.find({}).sort({created: -1})
    res.status(200).json(todos)
};


// get a single todo item
const getTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const todo = await Todo.findById(id)

    if (!todo) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json({todo})
};


// create a todo item
const createTodo = async (req, res) => {
    const {text, complete, priority} = req.body
    
    // add doc to db
    try {
        const todo = await Todo.create({text, complete, priority})
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
        //res.json(todo);
};

// delete a todo item
const deleteTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const todo = await Todo.findOneAndDelete({_id: id})

    if (!todo) {
        return res.status(400).json({error: 'No such task'})
    }

    res.status(200).json({todo})
}


// update a todo item
const updateTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    const todo = await Todo.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!todo) {
        return res.status(400).json({error: 'No such task'})
    }

    res.status(200).json(todo)
}





// For createTodo/post request
/*const todo = new Todo ({
    text: req.body.text,
});
todo.save();*/

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo
}