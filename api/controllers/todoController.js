const Todo = require('../models/Todo');
const mongoose = require('mongoose');


// get all todos
const getTodos = async (req, res) => {
    try {
        //const todos = await Todo.find();
        const todos = await Todo.find({}).sort({created: -1}) // Sort by creation date
        res.status(200).json(todos)
    } catch(error) {
        res.status(500).json({ error: error.message}); // Handle server errors
    }
};


// get a single todo item
const getTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    try {
    const todo = await Todo.findById(id)

    if (!todo) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json({todo}) // Return the todo directly
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// create a todo item
const createTodo = async (req, res) => {
    const {text, complete = false, priority = 'low', dueDate} = req.body // Ensure default values
    
    if (!text) {
        return re.status(400).json({ error: 'Text is required'});
    }

    // add doc to db
    try {
        const todo = await Todo.create({ text, complete, priority, dueDate })
        res.status(201).json(todo) // 201 status code for resource creation
    } catch (error) {
        res.status(400).json({error: error.message})
    }
        //res.json(todo);
};

// delete a todo item
const deleteTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    try {
    const todo = await Todo.findOneAndDelete({_id: id})

    if (!todo) {
        return res.status(404).json({error: 'No such task'}) // 404 for consistency
    }

    res.status(200).json({todo});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};


// update a todo item
const updateTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    try {
    const todo = await Todo.findOneAndUpdate({_id: id}, req.body, {
        new: true,
        runValidators: true
    });

    if (!todo) {
        return res.status(404).json({error: 'No such task'})
    }

    res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};





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