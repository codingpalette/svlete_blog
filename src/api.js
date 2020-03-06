import axios from 'axios';
const API = axios.create({
  // baseURL: 'https://us-central1-my-blog-7d61e.cloudfunctions.net/',
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/my-blog-7d61e/us-central1/' : 'https://us-central1-my-blog-7d61e.cloudfunctions.net/',
  timeout: 50000,
  headers: { 'X-Custom-Header': 'foobar' }
});

API.interceptors.request.use(
  function(config) {
    const user = JSON.parse(localStorage.getItem('__palette_user__'));
    config.headers.authorization = user.token;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const test = {
  Get: () => API.get('test/')
};

export const user = {
  Get: (offset, limit) =>
    API.get('/admin/users', {
      params: {
        offset,
        limit
      }
    })
};
