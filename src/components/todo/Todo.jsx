import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import TodoForm from './todo-form/TodoForm';
import TodoList from './todo-list/TodoList';
import TodoEdit from './todo-edit/TodoEdit';
import TodoTestEdit from './todo-edit/TodoTestEdit';

import { getTodoByCategories, transformObjToArr } from './util';

function Todo() {
  const [highPriorityTodos, setHighPriorityTodos] = useState([]);
  const [mediumPriorityTodos, setMediumPriorityTodos] = useState([]);
  const [lowPriorityTodos, setLowPriorityTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [todo, setTodo] = useState(null);

  const updateTodoState = (list) => {
    // list contains mixed priorities data, filtered as per priority.
    const {
      highPriorities,
      mediumPriorities,
      lowPriorities
    } = getTodoByCategories(list);

    // update state.
    setHighPriorityTodos(highPriorities);
    setMediumPriorityTodos(mediumPriorities);
    setLowPriorityTodos(lowPriorities);
  }
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('https://todo-react-app-3e9bb-default-rtdb.firebaseio.com/todos.json');
      
      // convert object response into list
      const list = transformObjToArr(response.data);
      updateTodoState(list);
    }

    fetchTodos();
  }, []);

  const handleAddTask = (todos) => {
    updateTodoState(todos);
  }

  const deleteTodoItem = async (id) => {
    await axios.delete(`https://todo-react-app-3e9bb-default-rtdb.firebaseio.com/todos/${id}.json`);
    const response = await axios.get('https://todo-react-app-3e9bb-default-rtdb.firebaseio.com/todos.json');
    // convert object response into list
    const list = transformObjToArr(response.data);
    updateTodoState(list);
  }

  const updateTodoItem = async (id, todo) => {
    await axios.put(`https://todo-react-app-3e9bb-default-rtdb.firebaseio.com/todos/${id}.json`, todo);
    const response = await axios.get('https://todo-react-app-3e9bb-default-rtdb.firebaseio.com/todos.json');
    // convert object response into list
    const list = transformObjToArr(response.data);
    updateTodoState(list);
    handleModalClose();
  }

  const handleModalClose = () => {
    setShowModal(false);
  }

  const handleOpenModal = (todo) => {
    setTodo(todo);
    setShowModal(true);
  }

  return (
    <Fragment>
      {/* <TodoTestEdit /> */}
      <TodoEdit onUpdateItem={updateTodoItem} todo={todo} show={showModal} onClose={handleModalClose} />
      <div className="row">
        <div className="col-lg-4 col-md-4">
          <TodoForm onAddTask={handleAddTask} />
        </div>
        <div className="col-lg-8 col-md-8">
          <TodoList
            highPriorities={highPriorityTodos}
            mediumPriorities={mediumPriorityTodos} 
            lowPriorities={lowPriorityTodos}
            onDelete={deleteTodoItem}
            onOpenModal={handleOpenModal}
          />
        </div>
      </div>
    </Fragment>
  ) 
}

export default Todo;
