import { vi } from 'vitest';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { RootState, AppDispatch } from '../src/store';
import { Dispatch, Action } from 'redux';

const getMockStore = (
  initialState: RootState,
): MockStoreEnhanced<RootState, AppDispatch> => {
  const mockStore = configureStore<RootState, AppDispatch>();
  const store = mockStore(initialState);
  store.dispatch = vi.fn() as Dispatch<Action>;

  return store;
};

export default getMockStore;
