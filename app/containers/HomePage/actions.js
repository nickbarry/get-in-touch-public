import { REQUEST_CONTACT_DATA } from './constants';

// This action doesn't currently have a corresponding reducer,
// because the request shouldn't update state.
export function requestContactData() {
  return {
    type: REQUEST_CONTACT_DATA,
  };
}
