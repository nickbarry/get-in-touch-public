import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import APIs from '../../../APIs';
import {
  REQUEST_ADD_CONTACT,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAILURE,
} from './constants';

function* addContact(/* action */ { userId, values }) {
  try {
    const response = yield call(APIs.server.addContact, userId, values);
    if (response.error) {
      throw new Error(response.error);
    }
    const contact = response.data;
    yield put({ type: ADD_CONTACT_SUCCESS, contact });
  } catch (error) {
    yield put({ type: ADD_CONTACT_FAILURE, error });
  }
}

export function* addContactSaga() {
  yield* takeEvery(REQUEST_ADD_CONTACT, addContact);
}

// All sagas to be loaded
export default [
  addContactSaga,
];
