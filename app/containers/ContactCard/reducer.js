/*
 *
 * ContactCard reducer
 *
 */

import { fromJS } from 'immutable';
import {
  MARK_CONTACT_CONTACTED,
  CONTACT_FETCH_SUCCEEDED,
  CONTACT_DELETION_SUCCESSFUL,
} from './constants';
import moment from 'moment';

const INITIAL_STATE = fromJS([]);

function convertDatesToMoment(contact) {
  const updatedContact = Object.assign({}, contact);
  updatedContact.contactNext = moment(contact.contactNext);
  updatedContact.lastContacted = moment(contact.lastContacted);
  return updatedContact;
}

function loadFetchedContactData(state, action) {
  const idsInState = state.map((contact) => contact.get('id'));
  const newContacts = action.contacts
    .filter((contact) => !idsInState.includes(contact.id))
    .map((contact) => convertDatesToMoment(contact));
  return state.push(...(newContacts.map((contact) => fromJS(contact))));
}

function updateLastContactedDate(state, action) {
  return state.map((contact) => {
    // We only want to update the relevant contact
    if (contact.get('id') === action.contactId) {
      return contact.set('lastContacted', action.lastContacted);
    }
    return contact;
  });
}

function contactsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MARK_CONTACT_CONTACTED:
      return updateLastContactedDate(state, action);
    case CONTACT_FETCH_SUCCEEDED:
      //console.log('reducer: action with new contacts:', action);
      return loadFetchedContactData(state, action);
    case CONTACT_DELETION_SUCCESSFUL:
      console.log('about to delete this contact (in reducer): ', action.contactId);
      return state.filter(contact => contact.get('id') !== action.contactId);
    default:
      return state;
  }
}

export default contactsReducer;
