import React, { useState } from 'react';

function AddTodoModal({ show, onClose, onAdd}) {
    const [text, setText] = useState('');
    const [completed, setCompleted] = useState(false);
    const [priority, setPriority] = useState('Low');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTodo = {
            text,
            completed,
            priority,
            dueDate
        };

        const res = await fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        });

        const data = await res.json();
        onAdd(data);
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <label>
                    Text:
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                </label>
                <label>
                    Completed:
                    <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
                </label>
                <label>
                    Priority:
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="Low">Low</option>    
                        <option value="Medium">Medium</option>    
                        <option value="High">High</option>    
                    </select>
                </label>
                <label>
                    Due Date:
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </label>
                <button type="submit">Add Todo</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default AddTodoModal;