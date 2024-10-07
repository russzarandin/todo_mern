import React, { useState } from 'react';

function AddTodoModal({ show, onClose, onAdd }) {
    const [newTodoInput, setNewTodoInput] = useState('');
    const [newPriority, setNewPriority] = useState('Low');
    const [newDueDate, setNewDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTodoInput) return;

        const todo = {
            text: newTodoInput,
            complete: false, // Ensures the new todos are incomplete on default
            priority: newPriority,
            dueDate: newDueDate
        };

        await onAdd(todo);

        setNewTodoInput("");
        setNewPriority("low");
        setNewDueDate("");

        onClose();
    };

    if (!show) return null;

    return (
        <div className="popup">
            <div className="popup-inner">
                <div className="closePopup" onClick={onClose}>x</div>
                <div className="content">
                    <h3>Add Task</h3>
                    <input
                        type="text"
                        placeholder="Task name"
                        onChange={(e) => setNewTodoInput(e.target.value)}
                        value={newTodoInput}
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
                        type="datetime-local"
                        id="dueDate"
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                    />
                    <div className="button" onClick={handleSubmit}>Create Task</div>
                </div>
            </div>
        </div>
    );
};

export default AddTodoModal;