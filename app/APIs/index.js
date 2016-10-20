import axios from 'axios';

const server = {
  fetchAllContacts() {
    return axios.get('/api/contacts');
  },
  deleteContact(userId) {
    return axios.delete(`/api/contact/${userId}`);
  },
};

const APIs = {
  server,
};

export default APIs;
