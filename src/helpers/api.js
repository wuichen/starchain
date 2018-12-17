import { jwtConfig } from '../settings';
import axios from 'axios'

let api = axios.create({
  baseURL: jwtConfig.fetchUrl,
})

api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function setToken() {
	const access_token = localStorage.getItem('access_token')
	api.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
}

// const customHeader = () => ({
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
//   Authorization: 'Bearer ' + localStorage.getItem('id_token') || undefined,
// });

// const base = (method, url, data = {}) => {
//   return fetch(`${jwtConfig.fetchUrl}${url}`, {
//     method,
//     headers: customHeader(),
//     body: JSON.stringify(data),
//   })
//     .then(response => response.json())
//     .then(res => res)
//     .catch(error => ({ error: 'Server Error' }));
// };

// const SuperFetch = {};
// ['get', 'post', 'put', 'delete'].forEach(method => {
//   SuperFetch[method] = base.bind(null, method);
// });
export {
	api,
	setToken
};
