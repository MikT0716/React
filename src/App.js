import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Task } from "./pages/Task";
import { Cat } from "./pages/Cat";
import { Nav } from "./pages/Nav";
import { NotFound } from "./pages/NotFound";

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

    const [catFact, setCatFact] = useState("");

    function fetchCats() {
        fetch("https://catfact.ninja/fact")
            .then((response) => response.json())
            .then((data) => {
                setCatFact(data.fact);
            });
    }

    return (
        <div className="App">
            <Router>
                <Nav></Nav>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route
                        path="/task"
                        element={
                            <div className="min-vh-75">
                                <h1 className="text-center">To-Do List</h1>
                                <div className="text-center my-3">
                                    <input onChange={handleStringInput}></input>
                                    <button onClick={addNewTaskToList}>
                                        Add task
                                    </button>
                                </div>
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
                        }
                    ></Route>
                    <Route
                        path="/cat"
                        element={
                            <Cat catFact={catFact} fetchCats={fetchCats}></Cat>
                        }
                    ></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
