//MongoDB database schema for the app using mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: String,
        default: Date.now()
    },
    priority: {
        type: String,
        default: 'Low'
    },
    dueDate: {
        type: Date,
        default: Date.now()
    }
})

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;