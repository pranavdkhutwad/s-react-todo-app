import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const TodoEdit = ({ 
    todo,
    show,
    onClose,
    onUpdateItem
}) => {
    const [task, setTask] = useState({
        name: '',
        desc: '',
        priority: ''
    });

    useEffect(() => {
        console.log('todo ==>', todo);
        setTask({
            ...task,
            name: todo?.name,
            desc: todo?.desc,
            priority: todo?.priority
        });
    }, [todo]);

    const handleTaskName = (event) => {
        const value = event.target.value;
        setTask({
            ...task,
            name: value,
        }); // async
    };

    const handleTaskDesc = (event) => {
        const value = event.target.value;
        setTask({
            ...task,
            desc: value,
        }); // async
    };

    const handleTaskPriority = (event) => {
        const value = event.target.value;
        setTask({
            ...task,
            priority: value,
        }); // async
    };

    const handleUpdate = () => {
        onUpdateItem(todo.id, task);
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <input onChange={handleTaskName} value={task.name} className="form-control" type="text" name="taskName" placeholder="Task Name" />
                    </div>
                    <div className="mb-3">
                        <textarea onChange={handleTaskDesc} value={task.desc} className="form-control" rows="5" name="taskDesc" placeholder="Task Description"></textarea>
                    </div>
                    <div className="mb-3">
                        <input onChange={handleTaskPriority} value={task.priority} className="form-control" type="number" name="taskPriority" placeholder="Task Priority" />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                Close
                </Button>
                <button onClick={handleUpdate} className="btn btn-success" type="button">Add Task</button>
            </Modal.Footer>
        </Modal>
    );
}

export default TodoEdit;
