import { fromJS } from 'immutable';
import {
  MARK_CONTACT_CONTACTED,
  CONTACT_FETCH_SUCCEEDED,
  CONTACT_DELETION_SUCCESSFUL,
} from './constants';
import moment from 'moment';

const initialState = fromJS([]);

function convertDatesToMoment(contact) {
  const updatedContact = Object.assign({}, contact);
  console.log('app/containers/ContactCard/reducer.js:19: contactNext; lastContacted: ', contact.contactNext, contact.lastContacted);
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

function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case MARK_CONTACT_CONTACTED:
      return updateLastContactedDate(state, action);
    case CONTACT_FETCH_SUCCEEDED:
      return loadFetchedContactData(state, action);
    case CONTACT_DELETION_SUCCESSFUL:
      return state.filter((contact) => contact.get('id') !== action.contactId);
    default:
      return state;
  }
}

export default contactsReducer;
