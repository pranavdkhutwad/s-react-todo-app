import { useState } from 'react';
import axios from 'axios';

import { transformObjToArr } from '../util';

function TodoForm({ onAddTask }) {
    const [task, setTask] = useState({
        name: '',
        desc: '',
        priority: '',
        nameError: '',
        descError: '',
        priorityError: '',
    });

    const isValidName = (name) => {
        if (name.length < 3) {
            return false;
        }

        return true;
    }

    const isFieldEmpty = (text) => {
        if (text.length) {
            return false;
        }

        return true;
    }

    const getNameErrorMessage = (text) => {
        if (text.length < 3) {
            return 'minimum 3 characters are required';
        }
    }

    const getPriorityErrorMessage = (text) => {
        if (!isValidPriority(text)) {
            return 'Only 1, 2 and 3 applicable';
        }
    }

    const isValidDesc = (desc) => {
        if (desc.length < 10) {
            return false;
        }

        return true;
    }

    const isValidPriority = (priority) => {
        if ([1, 2, 3].includes(Number(priority))) {
            return true;
        }

        return false;
    }

    const handleTaskName = (event) => {
        const value = event.target.value;

        if (isValidName(value)) {
            setTask({
                ...task,
                name: value,
                nameError: ''
            }); // async
        } else {
            let error = isFieldEmpty(value) 
                ? 'field is empty' 
                : getNameErrorMessage(value);

            setTask({
                ...task,
                name: value,
                nameError: error
            }); // async
        }
    }

    const handleTaskDesc = (event) => {
        const value = event.target.value;

        if (isValidDesc(value)) {
            setTask({
                ...task,
                desc: value,
                descError: '',
            }); // async
        } else {
            let error = isFieldEmpty(value) ? 'field is required' : '';

            setTask({
                ...task,
                desc: value,
                descError: error,
            }); // async
        }
    }

    const handleTaskPriority = (event) => {
        const value = event.target.value;
        if (isValidPriority(value)) {
            setTask({
                ...task,
                priority: value,
                priorityError: ''
            }); // async
        } else {
            let error = isFieldEmpty(value) ? 'field is required' : getPriorityErrorMessage(value);

            setTask({
                ...task,
                priority: value,
                priorityError: error
            }); // async
        }
        
    }

    const resetForm = () => {
        setTask({
            ...task,
            name: '',
            desc: '',
            priority: ''
        });
    }

    const handleAddTask = async () => {
        try {
            await axios.post(
                'https://todo-react-app-3e9bb-default-rtdb.firebaseio.com/todos.json',
                task
            );
            const response = await axios.get('https://todo-react-app-3e9bb-default-rtdb.firebaseio.com/todos.json');
            const todosList = transformObjToArr(response.data);
            onAddTask(todosList);
            resetForm();
        } catch (error) {
            console.log(error);
        }
    }
   
    const isDisabled = !task.name || !task.desc || !task.priority || !!task.nameError || !!task.descError || !!task.priorityError
    return (
        <div className="card">
            <div className="card-body">
                <form>
                    <div className="mb-3">
                        <input onChange={handleTaskName} value={task.name} className="form-control" type="text" name="taskName" placeholder="Task Name" />
                        <small className="text-danger">{task.nameError}</small>
                    </div>
                    <div className="mb-3">
                        <textarea onChange={handleTaskDesc} value={task.desc} className="form-control" rows="5" name="taskDesc" placeholder="Task Description"></textarea>
                        <small className="text-danger">{task.descError}</small>
                    </div>
                    <div className="mb-3">
                        <input onChange={handleTaskPriority} value={task.priority} className="form-control" type="number" name="taskPriority" placeholder="Task Priority" />
                        <small className="text-danger">{task.priorityError}</small>
                    </div>
                    <div className="d-grid">
                        <button disabled={isDisabled} onClick={handleAddTask} className="btn btn-success" type="button">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TodoForm;
