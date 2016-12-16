import * as api from '../api'
import request from '../api/request'
import { notification } from 'onsenui'

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';


export const init = () => {

    return (dispatch, getState) => {

        api.get('/users').then((response) => {
            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    user: response.data,
                    isLoggedIn: response.success
                }
            })
        }).catch((error) => {
            console.log(error)
        })
    }
}

export const login = (data) => {
    return (dispatch, getState) => {
        let config = {
            baseURL: SC_HOST
        }

        api.post('/app/mobilelogin', data, config).then((response) => {
            console.log(response)
            localStorage.setItem('sc-auth', JSON.stringify(response.data))
            request.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwt}`;
            dispatch(init())
        }).catch((error) => {
            console.log(error)
            if (error.data.message.username)
                notification.alert(error.data.message.username[0], { title: 'Ups!' })
            else
                notification.alert(error.data.message, { title: 'Ups!' })
        })
    }
}