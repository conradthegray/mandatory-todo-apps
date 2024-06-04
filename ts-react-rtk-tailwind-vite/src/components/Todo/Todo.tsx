import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { remove, toggleDone } from '../../slices/todos';
import { VscCheck, VscTrash, VscDiscard } from 'react-icons/vsc';

export type TodoProps = {
  id: string;
  task: string;
  done: boolean;
};

const Todo = ({ id, task, done }: TodoProps) => {
  const dispatch = useAppDispatch();

  const handleMarkAsDone = () => {
    dispatch(toggleDone(id));
  };

  const handleRemove = () => {
    dispatch(remove(id));
  };

  const taskClasses = classNames({
    'flex-1': true,
    'line-through': done,
  });

  return (
    <div className="mb-6 flex rounded bg-nord3 px-1.5 py-3 text-nord5 shadow-md">
      <button
        className="mr-3 flex h-6 w-6 items-center justify-center rounded text-center transition-all hover:bg-nord9 hover:shadow"
        onClick={handleMarkAsDone}
      >
        {done ? <VscDiscard /> : <VscCheck />}
      </button>
      <div className={taskClasses}>{task}</div>
      <button
        className="mr-3 flex h-6 w-6 items-center justify-center rounded text-center transition-all hover:bg-nord11 hover:shadow"
        onClick={handleRemove}
      >
        <VscTrash />
      </button>
    </div>
  );
};

export default Todo;
