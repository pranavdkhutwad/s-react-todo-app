export const transformObjToArr = (obj) => {
  const arr = [];
  for (let key in obj) {
    const todo = { ...obj[key], id: key };
    arr.push(todo);
  }
  return arr;
};

export const getTodoByCategories = (list) => {
  const highPriorities = list.filter((todo) => Number(todo.priority) === 1);
  const mediumPriorities = list.filter((todo) => Number(todo.priority) === 2);
  const lowPriorities = list.filter((todo) => Number(todo.priority) === 3);

  return {
    highPriorities,
    mediumPriorities,
    lowPriorities,
  };
};
