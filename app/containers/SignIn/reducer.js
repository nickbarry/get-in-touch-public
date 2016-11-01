import { fromJS } from 'immutable';
import {
  CHANGE_USER,
} from './constants';

const initialState = fromJS({
  currentUser: 0,
  users: [
    { userId: 0, name: 'Nico Greenarry' },
    { userId: 1, name: 'George Weiler' },
    { userId: 2, name: 'Elyse Greenarry' },
  ],
});

function signInReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER:
      return state.set('currentUser', action.userId);
    default:
      return state;
  }
}

export default signInReducer;
