import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

import './App.css';

function App() {
  return (
    <div className="mx-auto flex max-w-lg flex-col">
      <h1 className="mb-16 mt-8 text-center text-3xl font-bold text-nord5">
        What needs to be done?
      </h1>

      <div className="mb-8">
        <NewTodoForm />
      </div>

      <TodoList />
    </div>
  );
}

export default App;
