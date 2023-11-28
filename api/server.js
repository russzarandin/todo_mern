require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
const entriesRoutes = require('./routes/entries');

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

// Database connection
mongoose.connect(process.env.MONGO_URI
    /* Use these if swapping process.env.MONGO_URI to localhost link
    , useNewURLParser: true,
    useUnifiedTopology: true
    */)

    .then(() => {app.listen(process.env.PORT, () => {console.log('Connected to db and server started on port', process.env.PORT)
    });
})
    .catch(console.error);

// Imports 'Todo' model schema from Todo.js for the structure
const Todo = require('./models/Todo');

app.use('/api/entries', entriesRoutes);
