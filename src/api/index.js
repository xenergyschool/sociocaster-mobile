import axios from 'axios';
import Promise from 'promise';
import qs from 'qs'



let authdata = { jwt: '' };
if (typeof (Storage) !== 'undefined') {
    if (localStorage.getItem('sc-auth')) {
        authdata = JSON.parse(localStorage.getItem('sc-auth'));
    }
}
axios.defaults.baseURL = SC_API
axios.defaults.headers.common['Authorization'] = `Bearer ${authdata.jwt}`

export const get = (url, config = {}) => {

    return axios.get(url, config).then((response) => {
        if (!response.data.success)
            return Promise.reject(response.data)
        return response.data
    })
}

export const post = (url, data = {}, config = {}) => {
    return axios.post(url, qs.stringify(data), config).then((response) => {
        if (!response.data.success)
            return Promise.reject(response.data)
        return response.data
    })
}

export const patch = (url, data = {}, config = {}) => {
    return axios.patch(url, qs.stringify(data), config).then((response) => {
        if (!response.data.success)
            return Promise.reject(response.data)
        return response.data
    })
}

export const remove = (url, config={})=>{
    return axios.delete(url,config).then((response) => {
        if(response.status == 204){
            return {success:true}
        }else{
            if (!response.data.success)
                return Promise.reject(response.data)
            return response.data
        }
    })
}

export const setting = () => {

    if (typeof (Storage) !== 'undefined') {
        if (localStorage.getItem('sc-auth')) {
            authdata = JSON.parse(localStorage.getItem('sc-auth'));
        }
    }
    console.log(authdata)
    axios.defaults.headers.common['Authorization'] = `Bearer ${authdata.jwt}`
    console.log(axios.defaults)
}
