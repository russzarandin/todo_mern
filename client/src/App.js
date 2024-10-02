import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AddTodoModal from "./components/TodoModal";

const API_BASE = '/api/entries';

// State management using useState hook
function App() {
    
    const [todos, setTodos] = useState([]);
    const [sortCriteria, setSortCriteria] = useState("");
    const [popupActive, setPopupActive] = useState(false);

    // Fetch initial list of todos from server then calls GetTodos function 
    useEffect(() => {
        GetTodos();
    }, []);

    /* Fetches todos using fetch API and updates 'todos' states,
    Sends GET request to the server's /todos */
    const GetTodos = () => {
        fetch(API_BASE)
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((err) => console.error('Error :', err));
    }

    /* Sends a PUT request to mark a todo as complete or incomplete  using it's ID */ 
    const completeTodo = async (id, currentStatus) => {
        const data = await fetch(API_BASE + '/' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ complete: !currentStatus })
        }).then((res) => res.json());

        setTodos(todos.map((todo) =>
            todo._id === data._id ? { ...todo, complete: data.complete } : todo
        ));
    };

    /* Sends a DELETE request to delete a todo based on it's id and
    updates the 'todos' state */
    const deleteTodo = async (id) => {
        const data = await fetch(API_BASE + '/' + id, {
            method: 'DELETE'
        }).then((res) => res.json());

        setTodos(todos.filter((todo) => todo._id !== data._id));
    }

    /* Sends a POST request to make a new todo, updates 'todos' state
     */
    const addTodo = async (newTodo) => {
        const data = await fetch(API_BASE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...newTodo, complete: false}),
        }).then((res) => res.json());

        setTodos([...todos, data]);
    };

    // Sorts todos based on criteria
    const sortTodo = async () => {
        const data = await fetch(API_BASE + '/sort', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sortCriteria,
                ascending: false,
                sortByDueDate: sortCriteria === "dueDate",
            }),

        }).then((res) => res.json());
        setTodos(data);
    };

	return (
        <div className ="App">
            {/*
            <BrowserRouter>
                <Navbar />            
                <div className="pages">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </BrowserRouter> */}
            <div className="mainPage">
                <h1>Checklist</h1>
                <h4>Your Tasks</h4>

                {/* Sort options */}
                <div className="sort-options">
                    <label htmlFor="sortCriteria">Sort By:</label>
                    <select
                        id="sortCriteria"
                        value={sortCriteria}
                        onChange={(e) => setSortCriteria(e.target.value)}
                    >
                        <option value="priority">Priority</option>
                        <option value="dueDate">Due Date</option>
                    </select>
                    <button onClick={sortTodo}>Sort</button>
                </div>


                <div className="todos">
                    {todos.map((todo) => (
                        <div
                            className={"todo " + (todo.complete ? "is-complete" : "")}
                            key={todo._id}
                            onClick={() => completeTodo(todo._id, todo.complete)}
                        >
                            <div className="checkbox"></div>
                            <div className="text">{todo.text}</div>
                            <div className="priority">{todo.priority}</div>
                            <div className="dueDate">{todo.dueDate}</div>

                            {/* Prevent event propagation on delete */}
                            <div
                                className="delete-todo"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTodo(todo._id);
                                }}
                            >
                                x
                            </div>
                        </div>
                    ))}
                </div>
                {/* AddTodoModal Component */}
                <AddTodoModal addTodo={addTodo} />
                <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
            </div>
		</div>
	);
}

export default App;


//Main constant problem = either the delete function or the complete function as of 09/08/2023 on either server.js or app.js