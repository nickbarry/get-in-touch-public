/*
 *
 * ContactCard reducer
 *
 */

import { fromJS } from 'immutable';
import {
  MARK_CONTACT_CONTACTED,
  CONTACT_FETCH_SUCCEEDED,
} from './constants';
import moment from 'moment';

const INITIAL_STATE = fromJS([]);

function convertDatesToMoment(contact) {
  contact.contactNext = moment(contact.contactNext);
  contact.lastContacted = moment(contact.lastContacted);
}

function loadFetchedContactData(state, action) {
  action.contacts.forEach(contact => convertDatesToMoment(contact));
  return state.push(...(action.contacts.map(contact => fromJS(contact))));
}

function updateLastContactedDate(state, action) {
  return state.map(contact => {
    // We only want to update the relevant contact
    if (contact.get('id') === action.contactId) {
      return contact.set('lastContacted', action.lastContacted);
    } else {
      return contact;
    }
  });
}

function contactsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MARK_CONTACT_CONTACTED:
      return updateLastContactedDate(state, action);
    case CONTACT_FETCH_SUCCEEDED:
      return loadFetchedContactData(state, action);
    default:
      return state;
  }
}

export default contactsReducer;
