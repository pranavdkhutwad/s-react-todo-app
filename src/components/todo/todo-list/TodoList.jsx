import TodoItem from '../todo-item/TodoItem';

const TodoList = (props) => {
    const {
        highPriorities,
        mediumPriorities,
        lowPriorities,
        onDelete,
        onOpenModal
    } = props;

    return (
        <div className="row">
            <div className="col-lg-4 col-md-4">
                <h5>High Priority</h5>
                {highPriorities.map((todo, index) => {
                    return <TodoItem onOpenModal={onOpenModal} onDelete={onDelete} key={index} todo={todo} />;
                })}
            </div>
            <div className="col-lg-4 col-md-4">
                <h5>Medium Priority</h5>
                {mediumPriorities.map((todo, index) => {
                    return <TodoItem onOpenModal={onOpenModal} onDelete={onDelete} key={index} todo={todo} />;
                })}
            </div>
            <div className="col-lg-4 col-md-4">
                <h5>Low Priority</h5>
                {lowPriorities.map((todo, index) => {
                    return <TodoItem onOpenModal={onOpenModal} onDelete={onDelete} key={index} todo={todo} />;
                })}
            </div>
        </div>
    )
};

export default TodoList;
