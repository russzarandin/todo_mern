const express = require('express');
const {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo
} = require('../controllers/todoController');

const router = express.Router();


// Retrieves all the todos from the database and convert to a JSON
router.get('/', getTodos)

// Get a single todo
router.get('/:id', getTodo)

// Creates new todo item based on input, save to DB then converted to JSON response
router.post('/', createTodo)

// For the '/delete/id', if the "id" is changed, the req.params."id" will have to be changed as well
// Deletes a todo item based on id, save to the DB then convert to JSON response
router.delete('/:id', deleteTodo)

// Marks todo item as complete or incomplete, save to the DB then converts to JSON response
router.patch('/:id', updateTodo)


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