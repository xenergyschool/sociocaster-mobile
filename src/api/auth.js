import request from './request';

export const login = (data) => ({
    return request.post('/app/mobilelogin', data, { baseURL: SC_HOST }).then()
});
