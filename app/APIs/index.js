import axios from 'axios';

const server = {
  fetchAllContacts() {
    return axios.get('/api/contacts');
  },
  updateContact(contactId, values) {
    console.log('app/APIs/index.js:7: Values: ', values);
    return axios.post(`/api/contact/${contactId}`, values);
  },
  deleteContact(contactId) {
    return axios.delete(`/api/contact/${contactId}`);
  },
};

const APIs = {
  server,
};

export default APIs;
