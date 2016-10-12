import {
  MARK_CONTACT_CONTACTED,
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
