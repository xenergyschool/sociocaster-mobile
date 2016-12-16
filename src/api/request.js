import axios from 'axios';

let authdata = { jwt: '' };
if (typeof (Storage) !== 'undefined') {
    if (localStorage.getItem('sc-auth')) {
        authdata = JSON.parse(localStorage.getItem('sc-auth'));
    }
}

export default axios.create({
    baseURL: SC_API,
    headers: { 'Authorization': `Bearer ${authdata.jwt}` }
});
