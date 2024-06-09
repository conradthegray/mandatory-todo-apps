import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { MockStoreEnhanced } from 'redux-mock-store';
import Todo from './Todo';
import { RootState, AppDispatch } from '../../store';
import { remove, toggleDone } from '../../slices/todos';
import getMockStore from '../../../test/mockStore';

describe('Todo Component', () => {
  let store: MockStoreEnhanced<RootState, AppDispatch>;

  const mockTodo = {
    id: '1',
    task: 'Test Task',
    done: false,
  };

  beforeEach(() => {
    const initialState: RootState = {
      todos: {
        todos: [mockTodo],
      },
    };

    store = getMockStore(initialState);
  });

  const renderComponent = (todo = mockTodo) =>
    render(
      <Provider store={store}>
        <Todo id={todo.id} task={todo.task} done={todo.done} />
      </Provider>,
    );

  it('should render task description and buttons correctly', () => {
    renderComponent();

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Mark as done/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
  });

  it('should mark task as done when done button is clicked', () => {
    renderComponent();

    const markAsDoneButton = screen.getByRole('button', {
      name: /Mark as done/i,
    });
    fireEvent.click(markAsDoneButton);

    expect(store.dispatch).toHaveBeenCalledWith(toggleDone(mockTodo.id));
  });

  it('should mark task as incomplete when revert button is clicked', () => {
    renderComponent({
      id: '1',
      task: 'Test Task',
      done: true,
    });

    const markAsDoneButton = screen.getByRole('button', {
      name: /Mark as incomplete/i,
    });
    fireEvent.click(markAsDoneButton);

    expect(store.dispatch).toHaveBeenCalledWith(toggleDone(mockTodo.id));
  });

  it('should remove task when remove button is clicked', () => {
    renderComponent();

    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    expect(store.dispatch).toHaveBeenCalledWith(remove(mockTodo.id));
  });
});
