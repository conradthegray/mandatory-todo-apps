import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { MockStoreEnhanced } from 'redux-mock-store';
import TodoList from './TodoList';
import { RootState, AppDispatch } from '../../store';
import getMockStore from '../../../test/mockStore';

describe('TodoList Component', () => {
  let store: MockStoreEnhanced<RootState, AppDispatch>;

  beforeEach(() => {
    const initialState: RootState = {
      todos: {
        todos: [],
      },
    };
    store = getMockStore(initialState);
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

  it('should render EmptyList component when there are no todos', () => {
    renderComponent();

    expect(screen.getByText('🥳')).toBeInTheDocument();
  });

  it('should render Todo components when there are todos', () => {
    const initialState: RootState = {
      todos: {
        todos: [
          { id: '1', task: 'Test Todo 1', done: false },
          { id: '2', task: 'Test Todo 2', done: true },
        ],
      },
    };

    store = getMockStore(initialState);

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });
});
