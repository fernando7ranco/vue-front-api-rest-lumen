"use strict";

import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  //baseURL: process.env.baseURL || process.env.apiUrl || "",
  // timeout: 60 * 1000, // Timeout

  withCredentials: false, // Check cross-site Access-Control
  baseURL: 'https://localhost/www/api/public/',
  headers: { 
    Authorization: 'Bearer 123456'
  }
};

export default axios.create(config);