import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import APIs from '../../APIs';
import {
  REQUEST_CONTACT_DELETION,
  CONTACT_DELETION_SUCCESSFUL,
  CONTACT_DELETION_FAILED,
} from './constants';

// Will be fired on each REQUEST_CONTACT_DELETION action
function* deleteContact(action) {
  try {
    const response = yield call(APIs.server.deleteContact, action.contactId);
    if (response.error) {
      throw new Error(response.error);
    }
    // console.log('server response: ', response);
    yield put({ type: CONTACT_DELETION_SUCCESSFUL, contactId: action.contactId });
  } catch (error) {
    yield put({ type: CONTACT_DELETION_FAILED, contactId: action.contactId, error });
  }
}

// Individual exports for testing
export function* deleteContactSaga() {
  yield* takeEvery(REQUEST_CONTACT_DELETION, deleteContact);
}

// All sagas to be loaded
export default [
  deleteContactSaga,
];
