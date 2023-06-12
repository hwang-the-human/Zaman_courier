import {combineReducers, createStore} from 'redux';
import _ from 'lodash';

//ACTIONS

export function setOrder(order) {
  return {
    type: 'SET_ORDER',
    payload: order,
  };
}

export function setLoading(opened, done) {
  return {
    type: 'SET_LOADING',
    payload: {opened: opened, done: done},
  };
}

export function setUser(user) {
  return {
    type: 'SET_USER',
    payload: user,
  };
}

export function clearStore() {
  return {
    type: 'CLEAR_STORE',
  };
}

//REDUCERS

function userReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_USER':
      state = action.payload;
    default:
      return state;
  }
}

function loadingReducer(state = {opened: false, done: false}, action) {
  switch (action.type) {
    case 'SET_LOADING':
      state = action.payload;
    default:
      return state;
  }
}

function orderReducer(state = null, action) {
  switch (action.type) {
    case 'SET_ORDER':
      return (state = action.payload);
    default:
      return state;
  }
}

//STORE

const reducers = combineReducers({
  orderReducer,
  loadingReducer,
  userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STORE') {
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

const store = createStore(rootReducer);

export default store;
