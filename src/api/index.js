import request from './request'
import Promise from 'promise';

export const get = (url, config) => {

    return request.get(url, config).then((response) => {
        if (!response.data.success)
            return Promise.reject(response)
        return response
    })
}
