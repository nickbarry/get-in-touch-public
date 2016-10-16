'use strict';

import axios from 'axios';

const server = {
  fetchAllContacts: function () {
    return axios.get('/api/contacts');
  },
  deleteContact: function(userId) {
    console.log(userId, `/api/contact/${userId}`);
    return axios.delete(`/api/contact/${userId}`);
  },
};

const APIs = {
  server,
};

export default APIs;