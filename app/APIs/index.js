import axios from 'axios';

const server = {
  fetchAllContacts: function () {
    return axios.get('/api/contacts');
  },
};

const APIs = {
  server,
};

export default APIs;