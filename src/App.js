import { useState } from "react";
import { Task } from "./task";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from "react-bootstrap";

function App() {
    const [toDoList, setToDoList] = useState([]);
    const [newTask, setNewTask] = useState("");
    const handleStringInput = (event) => {
        setNewTask(event.target.value);
    };

    const addNewTaskToList = () => {
        const task = {
            id:
                toDoList.length === 0
                    ? 1
                    : toDoList[toDoList.length - 1].id + 1,
            taskName: newTask,
            completed: false,
        };
        setToDoList([...toDoList, task]);
    };
    const deleteTask = (id) => {
        setToDoList(toDoList.filter((task) => task.id !== id));
    };
    const completeTask = (id) => {
        setToDoList(
            toDoList.map((task) => {
                if (task.id === id) {
                    return { ...task, completed: true };
                } else {
                    return task;
                }
            })
        );
    };

    function fetchCats() {
        fetch("https://catfact.ninja/fact")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }

    return (
        <div className="App">
            <div className="min-vh-75">
                <h1 className="text-center">To-Do List</h1>
                <Nav className="justify-content-center my-3">
                    <input onChange={handleStringInput}></input>
                    <button onClick={addNewTaskToList}>Add task</button>
                </Nav>
                <div className="list">
                    {toDoList.map((task) => {
                        return (
                            <Task
                                taskName={task.taskName}
                                id={task.id}
                                completed={task.completed}
                                deleteTask={deleteTask}
                                completeTask={completeTask}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="min-vh-75 justify-content-center">
                <div className="text-center">
                    <h1 className="my-3">Cat Fact Generator</h1>
                    <button onClick={fetchCats}>
                        Generate meawsome Cat Facts!
                    </button>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default App;
