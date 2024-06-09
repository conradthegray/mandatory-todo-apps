import { expect, it, describe, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MockStoreEnhanced } from 'redux-mock-store';
import NewTodoForm from './NewTodoForm';
import { add } from '../../slices/todos';
import { RootState, AppDispatch } from '../../store';
import getMockStore from '../../../test/mockStore';

describe('NewTodoForm', () => {
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
        <NewTodoForm />
      </Provider>,
    );

  it('should render form input and button', () => {
    renderComponent();

    expect(
      screen.getByPlaceholderText('What are you planning to do?'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add todo/i }),
    ).toBeInTheDocument();
  });

  it('should display error message when input is empty and form is submitted', async () => {
    renderComponent();

    const button = screen.getByRole('button', { name: /add todo/i });
    const input = screen.getByPlaceholderText('What are you planning to do?');

    fireEvent.change(input, { target: { value: ' ' } }); // Simulate user typing a space to make the form dirt
    fireEvent.click(button);

    await waitFor(() => {
      const errorMessage = screen.getByText("You can't do nothing 🙃");
      expect(errorMessage).toHaveClass('opacity-1');
    });
  });

  it('should dispatch add action and reset form on submit', async () => {
    renderComponent();

    const input = screen.getByPlaceholderText('What are you planning to do?');
    fireEvent.change(input, { target: { value: 'New Todo' } });

    const button = screen.getByRole('button', { name: /add todo/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(add({ task: 'New Todo' }));
      expect(input).toHaveValue('');
    });
  });
});
