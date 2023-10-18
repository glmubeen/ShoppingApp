import axios from 'axios';
import endPoints from '../constants/endPoints';
import WooCommerceAPI from 'react-native-woocommerce-api';

// setup base thing
const apiRequest = axios.create({
  baseURL: endPoints.baseUrl,
  responseType: 'json',
  headers: {'Content-Type': 'application/json'},
  timeout: 10000,
});

apiRequest.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return Promise.resolve(response);
    }
  },
  error => {
    if (error.response.status == 401) {
    }
    return Promise.reject(error.response);
  },
);

export default apiRequest;

// For Wordpress Rest Api
export const WCAPI = new WooCommerceAPI({
  url: endPoints.baseUrl,
  ssl: true,
  consumerKey: endPoints.consumerKey,
  consumerSecret: endPoints.consumerSecret,
  wpAPI: true, // Enable the WP REST API integration
  version: endPoints.version, // WooCommerce WP REST API version
  queryStringAuth: true,
});
