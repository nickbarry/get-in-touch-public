import { fromJS } from 'immutable';
import {
  REQUEST_UPDATE_CONTACT,
  UPDATE_CONTACT_SUCCESSFUL,
  UPDATE_CONTACT_FAILED,
  CANCEL_CONTACT_EDITING_APP_STATE,
} from '../ContactCard/constants';

const initialState = fromJS({
  containers: {},
  contacts: {},
  stories: {},
});

function markContactAsUpdating(state, action, updatingStatus) {
  return state.setIn(['contacts', action.contactId, 'updatingStatus'], updatingStatus);
}

function appStatusReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_UPDATE_CONTACT:
      return markContactAsUpdating(state, action, true);
    case UPDATE_CONTACT_SUCCESSFUL:
      return markContactAsUpdating(state, action, false);
    case UPDATE_CONTACT_FAILED:
      return markContactAsUpdating(state, action, `Failed: ${action.error}`);
    case CANCEL_CONTACT_EDITING_APP_STATE:
      return markContactAsUpdating(state, action, false);
    default:
      return state;
  }
}

export default appStatusReducer;
