import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { server } from '../../APIs';
import {
  REQUEST_CONTACT_DATA, CONTACT_FETCH_SUCCEEDED, CONTACT_FETCH_FAILED,
} from './constants';


// Will be fired on each REQUEST_CONTACT_DATA action
function* fetchContacts() {
  try {
    const contacts = yield call(/* function that requests contacts */);
    yield put({ type: CONTACT_FETCH_SUCCEEDED, contacts});
  } catch (error) {
    yield put({ type: CONTACT_FETCH_FAILED, error });
  }
}

// Individual exports for testing
export function* fetchContactsSaga() {
  yield* takeLatest(REQUEST_CONTACT_DATA, fetchContacts);
}

// All sagas to be loaded
export default [
  fetchContactsSaga,
];
