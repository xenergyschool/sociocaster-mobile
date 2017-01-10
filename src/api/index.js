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

export const remove = (url, config = {}) => {
    return axios.delete(url, config).then((response) => {
        if (response.status == 204) {
            return { success: true }
        } else {
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

export const upload = (uri, fileURL, options) => {
    return new Promise((resolve, reject) => {
        uri = encodeURI(uri)
        let defaultOptions = new FileUploadOptions();
        defaultOptions.fileKey = options.fileKey;
        let filename = fileURL.substr(fileURL.lastIndexOf('/') + 1)
        defaultOptions.fileName = filename.indexOf('.jpg') > -1 || filename.indexOf('.png') || filename.indexOf('.gif') ? filename : `${filename}.jpg`


        var headers = { 'Authorization': `Bearer ${authdata.jwt}` }

        defaultOptions.headers = headers

        let ft = new FileTransfer()
        /*
        ft.onprogress = (progressEvent) => {
            if (progressEvent.lengthComputable) {
                //loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
            } else {
                // loadingStatus.increment();
            }
        }
        */
        ft.upload(
            fileURL,
            uri,
            (r) => {
                resolve(r)
            },
            (error) => {
                reject(error)
            },
            defaultOptions
        )

    })

}
