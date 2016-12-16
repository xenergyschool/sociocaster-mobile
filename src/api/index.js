import request from './request'
import Promise from 'promise';
import qs from 'qs'
export const get = (url, config = {}) => {

    return request.get(url, config).then((response) => {
        if (!response.data.success)
            return Promise.reject(response.data)
        return response.data
    })
}

export const post = (url, data = {}, config = {}) => {
    return request.post(url, qs.stringify(data), config).then((response) => {
        if (!response.data.success)
            return Promise.reject(response.data)
        return response.data
    })
}
