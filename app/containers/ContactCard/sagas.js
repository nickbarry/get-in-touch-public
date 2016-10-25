import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import APIs from '../../APIs';
import {
  REQUEST_UPDATE_CONTACT,
  UPDATE_CONTACT_SUCCESSFUL,
  UPDATE_CONTACT_FAILED,
  REQUEST_CONTACT_DELETION,
  CONTACT_DELETION_SUCCESSFUL,
  CONTACT_DELETION_FAILED,
} from './constants';
import moment from 'moment';

function* updateContact(action) {
  try {
    const response = yield call(APIs.server.updateContact, action.contactId, action.values);
    if (response.error) {
      throw new Error(response.error);
    }

    action.successCallback();
    const valuesForState = Object.assign({}, action.values, {
      lastContacted: moment(action.values.lastContacted),
    });
    yield put({
      type: UPDATE_CONTACT_SUCCESSFUL,
      contactId: action.contactId,
      values: valuesForState,
    });
  } catch (error) {
    yield put({ type: UPDATE_CONTACT_FAILED, contactId: action.contactId, error });
  }
}

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
export function* updateContactSaga() {
  yield* takeEvery(REQUEST_UPDATE_CONTACT, updateContact);
}

// All sagas to be loaded
export default [
  deleteContactSaga,
  updateContactSaga,
];
