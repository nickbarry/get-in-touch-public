import {
  MARK_CONTACT_CONTACTED,
  REQUEST_CONTACT_DELETION,
  CONTACT_DELETION_SUCCESSFUL,
  CONTACT_DELETION_FAILED,
} from './constants';
import moment from 'moment';

function getToday() {
  return moment().hours(0).minutes(0).seconds(0).milliseconds(0);
}

export function markContactContacted(contactId, lastContacted = getToday()) {
  if (typeof lastContacted === 'string') { // else assume it's a `moment` object
    lastContacted = moment(lastContacted);
  }
  return {
    type: MARK_CONTACT_CONTACTED,
    contactId,
    lastContacted,
  };
}

export function requestContactDeletion(contactId) {
  return {
    type: REQUEST_CONTACT_DELETION,
    contactId,
  };
}
// The contactDeletionSuccessful action is fired by the saga
