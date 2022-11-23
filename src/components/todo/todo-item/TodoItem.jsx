import "./TodoItem.css";

const TodoItem = ({ todo, onDelete, onOpenModal }) => {

    const getBorderClass = (priority) => {
        switch(priority) {
            case '1': {
                return 'high-priority';
            }
            case '2': {
                return 'medium-priority';
            }
            case '3': {
                return 'low-priority';
            }
            default: {
                return '';
            }
        }
    }

    const handleDeleteItem = async (id) => {
        onDelete(id);
    }
    
    return (
        <div className={`card mb-3 ${getBorderClass(todo.priority)}`}>
            <div className="card-header d-flex justify-content-between">
                <div>{todo.name}</div>
                <div>
                    <i onClick={() => onOpenModal(todo)} className="fa fa-pencil text-info" aria-hidden="true"></i>
                    <i onClick={() => handleDeleteItem(todo.id)} className="fa fa-trash text-danger ms-3" aria-hidden="true"></i>
                </div>
            </div>
            <div className="card-body">
                <p>{todo.desc}</p>
                <p>{todo.priority}</p>
            </div>
        </div>
    );
};

export default TodoItem;
