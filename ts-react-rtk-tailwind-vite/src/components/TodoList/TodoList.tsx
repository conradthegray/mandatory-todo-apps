import { useAppSelector } from '../../hooks';

import Todo from '../Todo';

const EmptyList = () => <div className="text-center text-5xl">🥳</div>;

const TodoList = () => {
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <div>
      {todos.length === 0 ? (
        <EmptyList />
      ) : (
        todos.map((todo) => <Todo {...todo} key={`todo-${todo.id}`} />)
      )}
    </div>
  );
};

export default TodoList;
