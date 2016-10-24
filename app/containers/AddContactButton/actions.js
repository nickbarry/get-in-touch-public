import { REQUEST_ADD_CONTACT } from './constants';

export function requestAddContact(newContactValues) {
  const jsContact = newContactValues.toJS();
  return {
    type: REQUEST_ADD_CONTACT,
    values: jsContact,
  };
}
