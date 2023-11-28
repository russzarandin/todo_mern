const express = require('express');

const router = express.Router();



// Retrieves all the todos from the database and convert to a JSON
router.get('/', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

//Get a single todo
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single todo'})
});

// Creates new todo item based on input, save to DB then converted to JSON response
router.post('/', (req, res) => {
    const todo = new Todo ({
        text: req.body.text,
    });

    todo.save();
    
    res.json(todo);
});

// For the '/delete/id', if the "id" is changed, the req.params."id" will have to be changed as well
// Deletes a todo item based on id, save to the DB then convert to JSON response
router.delete('/:id', async (req, res) => {

    const todo = await Todo.findByIdAndDelete(req.params.id);


    res.json(todo);
})

// Marks todo item as complete or incomplete, save to the DB then converts to JSON response
router.get('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})


// For sorting 
/* router.put('/', async (req, res) => {
    try {
        const { sortCriteria, ascending, sortByDueDate } = req.body;
        let sortQuery = {};

        if (sortCriteria === "dueDate") {
            sortQuery = { dueDate: sortByDueDate ? 1 : -1 };
        } else {
            sortQuery = { priority: ascending ? 1 : -1 };
        }

        const todo = await Todo.find().sort(sortQuery);

        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sorting todo.' });
    }
});
*/

module.exports = router;