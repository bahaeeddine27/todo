import React from "react";

const App = ({ tasks = [] }) => {
    return (
        <div>
            <h1>Liste des tâches</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} {task.completed ? "✔️" : "❌"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;