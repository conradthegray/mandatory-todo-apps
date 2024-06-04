import { expect, test, describe, vi } from 'vitest';
import reducer, {
  add,
  toggleDone,
  remove,
  initialState,
  TodosState,
} from './todos';

vi.mock('uuid', () => ({ v4: () => '123456789' }));

test('should return the initial state', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
});

test('should handle adding a todo to an empty list', () => {
  const previousState: TodosState = {
    todos: [],
  };

  expect(
    reducer(
      previousState,
      add({
        task: 'A sample todo',
      }),
    ),
  ).toEqual({
    todos: [
      {
        id: '123456789',
        task: 'A sample todo',
        done: false,
      },
    ],
  });
});

describe('remove', () => {
  test('should remove an existing todo from a list', () => {
    const previousState: TodosState = {
      todos: [
        {
          id: '123',
          task: 'Sample task 1',
          done: false,
        },
        {
          id: '456',
          task: 'Sample task 2',
          done: false,
        },
        {
          id: '789',
          task: 'Sample task 3',
          done: false,
        },
      ],
    };

    expect(reducer(previousState, remove('456'))).toEqual({
      todos: [
        {
          id: '123',
          task: 'Sample task 1',
          done: false,
        },
        {
          id: '789',
          task: 'Sample task 3',
          done: false,
        },
      ],
    });
  });

  test('should not change the state if a todo to remove does not exist', () => {
    const previousState: TodosState = {
      todos: [
        {
          id: '123',
          task: 'Sample task 1',
          done: false,
        },
        {
          id: '456',
          task: 'Sample task 2',
          done: false,
        },
        {
          id: '789',
          task: 'Sample task 3',
          done: false,
        },
      ],
    };

    expect(reducer(previousState, remove('999'))).toEqual({
      todos: [
        {
          id: '123',
          task: 'Sample task 1',
          done: false,
        },
        {
          id: '456',
          task: 'Sample task 2',
          done: false,
        },
        {
          id: '789',
          task: 'Sample task 3',
          done: false,
        },
      ],
    });
  });
});

test('should correctly toggle todo state', () => {
  const previousState: TodosState = {
    todos: [
      {
        id: '123',
        task: 'Sample task 1',
        done: false,
      },
      {
        id: '456',
        task: 'Sample task 2',
        done: false,
      },
      {
        id: '789',
        task: 'Sample task 3',
        done: false,
      },
    ],
  };

  expect(reducer(previousState, toggleDone('456'))).toEqual({
    todos: [
      {
        id: '123',
        task: 'Sample task 1',
        done: false,
      },
      {
        id: '456',
        task: 'Sample task 2',
        done: true,
      },
      {
        id: '789',
        task: 'Sample task 3',
        done: false,
      },
    ],
  });
});
