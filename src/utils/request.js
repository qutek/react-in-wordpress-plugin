import axios from 'axios';
// import qs from 'qs';

const request = axios.create({
  baseURL: wpApiSettings.root + wpApiSettings.versionString,
  timeout: 1000,
  headers: {'X-WP-Nonce': wpApiSettings.nonce},
  // paramsSerializer: function (params) {
  //   return qs.stringify(params, {arrayFormat: 'brackets'})
  // },
});

export default request