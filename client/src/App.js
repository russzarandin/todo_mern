import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';

const API_BASE = 'http://localhost:3001';

// State management using useState hook
function App() {
    
    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("");
    const [newPriority, setNewPriority] = useState("low");
    const [newDueDate, setNewDueDate] = useState("");
    const [editPriority, setEditPriority] = useState("low");
    const [editDueDate, setDueDate] = useState("");
    const [sortCriteria, setSortCriteria] = useState("");

    // Fetch initial list of todos from server then calls GetTodos function 
    useEffect(() => {
        GetTodos();
        console.log(todos);
    }, [])

    /* Fetches todos using fetch API and updates 'todos' states,
    Sends GET request to the server's /todos */
    const GetTodos = () => {
        fetch(API_BASE + '/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error('Error :', err));
    }

    /* Sends a PUT request to mark a todo as complete or incomplete  using it's ID 
    and then updates the 'todos' state */ 
    const completeTodo = async id => {
        const data = await fetch(API_BASE + '/todo/complete/' + id)
            .then(res => res.json());

        setTodos(todos => todos.map(todo => {
            if (todo._id === data._id) {
                todo.complete = data.complete;
            }

            return todo;
        }));
    }

    /* Sends a DELETE request to delete a todo based on it's id and
    updates the 'todos' state */
    const deleteTodo = async id => {
        const data = await fetch(API_BASE + '/todo/delete/' + id, {
            method: "DELETE"
        }).then(res => res.json());

        setTodos(todos => todos.filter(todo => todo._id !== data._id));
    }

    /* Sends a POST request to make a new todo, updates 'todos' state
     */
    const addTodo = async () => {
        const data = await fetch(API_BASE + '/todo/new', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newTodo, 
                priority: newPriority,
                dueDate: newDueDate
            }),
        }).then(res => res.json());

        setTodos([...todos, data]);
        setPopupActive(false);
        setNewTodo("");
    }

    const sortTodo = async () => {
        const data = await fetch(API_BASE + '/todo/sort', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sortCriteria: newPriority,
                ascending: false,
                sortByDueDate: newPriority === "dueDate",
            }),

        });
    }




	return (
        <div className ="App">
            <BrowserRouter>
                <Navbar />            
                <div className="pages">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />


                    </Routes>
                </div>
            </BrowserRouter>
            <div className="mainPage">
                <h1>Checklist</h1>
                <h4>Your Tasks</h4>

                <div className ="todos">
                    {todos.map(todo => (
                        <div className = {"todo " + (todo.complete ? "is-complete" : "")}
                        key = {todo._id} 
                        onClick = {() => completeTodo(todo._id)}>
                            <div className ="checkbox"></div>

                            <div className ="text">{ todo.text }</div>
                            <div className ="priority">{ todo.priority }</div>
                            <div className ="dueDate">{ todo.dueDate }</div>

                            <div className ="delete-todo" onClick = {() => deleteTodo(todo._id)}>x</div>
                        </div>
                    ))}
                </div>

                <div className ="addPopup" onClick = {() => setPopupActive(true)}>+</div>

                {popupActive ? (
                    <div className ="popup">
                        <div className ="closePopup" onClick = {() => setPopupActive(false)}>x</div>
                        <div className ="content">
                            <h3>Add Task</h3>
                            {newTodo}
                            <input 
                                type ="text" 
                                className ="add-todo-input" 
                                onChange = {e => setNewTodo(e.target.value)}
                                value = {newTodo} 
                            />
                            <div className ="button" onClick = {addTodo}>Create Task</div>
                        </div>
                    </div>
                    ) : ''}
            </div>
		</div>
	);
}

export default App;


//Main constant problem = either the delete function or the complete function as of 09/08/2023 on either server.js or app.js