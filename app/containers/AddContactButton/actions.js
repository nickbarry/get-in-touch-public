import { REQUEST_ADD_CONTACT } from './constants';

export function requestAddContact(newContactValues) {
  const jsContact = newContactValues.toJS();

  // Hard code in Nico's userId. Soon we'll need to detect the correct userId and use that
  jsContact.userId = 0;

  return {
    type: REQUEST_ADD_CONTACT,
    values: jsContact,
  };
}
