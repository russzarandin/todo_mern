import React, { useState } from 'react';

function AddTodoModal({ show, onClose, onAdd}) {
    const [newTodo, setNewTodo] = useState('');
    const [newPriority, setNewPriority] = useState('Low');
    const [newDueDate, setNewDueDate] = useState('');
    const [popupActive, setPopupActive] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTodo = {
            text: newTodo,
            complete: false, // Ensures the new todos are incomplete on default
            priority: newPriority,
            dueDate: newDueDate
        };

        setPopupActive(false);
        setNewTodo("");
        setNewPriority("low");
        setNewDueDate("");
    };

    if (!popupActive) return null;

    return (
        <div>
            {popupActive && (
                <div className="popup">
                    <div className="content">
                        <h3>Add Task</h3>
                        <input
                            type="text"
                            placeholder="Task name"
                            onChange={(e) => setNewTodo(e.target.value)}
                            value={newTodo}
                        />
                        <label htmlFor="priority">Priority:</label>
                        <select
                            id="priority"
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <label htmlFor="dueDate">Due Date:</label>
                        <input
                            type="date"
                            id="dueDate"
                            value={newDueDate}
                            onChange={(e) => setNewDueDate(e.target.value)}
                        />
                        <div className="button" onClick={handleSubmit}>Create Task</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTodoModal;