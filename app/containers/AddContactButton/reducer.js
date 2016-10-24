import { fromJS } from 'immutable';
import {
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAILURE,
} from './constants';

function addContactSuccess(state, action) {

}

function addContactFailure(state, action) {

}

const initialState = fromJS({});

function addContactButtonReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT_SUCCESS:
      return addContactSuccess(state, action);
    case ADD_CONTACT_FAILURE:
      return addContactFailure(state, action);
    default:
      return state;
  }
}

export default addContactButtonReducer;
