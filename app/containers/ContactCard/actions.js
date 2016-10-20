import {
  REQUEST_UPDATE_CONTACT,
  MARK_CONTACT_CONTACTED,
  REQUEST_CONTACT_DELETION,
} from './constants';
import moment from 'moment';

function getToday() {
  return moment().hours(0).minutes(0).seconds(0).milliseconds(0);
}

export function markContactContacted(contactId, lastContactedParam = getToday()) {
  const lastContacted = typeof lastContacted === 'string' ? moment(lastContactedParam) : lastContactedParam;
  return {
    type: MARK_CONTACT_CONTACTED,
    contactId,
    lastContacted,
  };
}

export function requestUpdateContact(contactId, formValues) {
  const values = formValues.toJS();

  return {
    type: REQUEST_UPDATE_CONTACT,
    contactId,
    values,
  };
}

export function requestContactDeletion(contactId) {
  return {
    type: REQUEST_CONTACT_DELETION,
    contactId,
  };
}
// The contactDeletionSuccessful action is fired by the saga
