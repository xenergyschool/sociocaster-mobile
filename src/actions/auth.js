import * as api from '../api'
import { notification } from 'onsenui'
import * as socialaccountActions from './socialaccount'

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';


export const init = () => {

    return (dispatch, getState) => {

        api.get('/users').then((response) => {
            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    user: response.data,
                    isLoggedIn: response.success,
                    isChecking: false
                }
            })
            dispatch(socialaccountActions.get())
        }).catch((response) => {
            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    user: response.data,
                    isLoggedIn: response.success,
                    isChecking: false
                }
            })
        })
    }
}

export const login = (data) => {
    return (dispatch, getState) => {
        let config = {
            baseURL: SC_HOST
        }

        dispatch({
            type: AUTH_SUCCESS,
            data: {
                isChecking: true
            }
        })

        api.post('/app/mobilelogin', data, config).then((response) => {
            console.log(response)
            localStorage.setItem('sc-auth', JSON.stringify(response.data))
            api.setting()

            dispatch(init())
        }).catch((error) => {
            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    isChecking: false
                }
            })
            if (error.data.message.username)
                notification.alert(error.data.message.username[0], { title: 'Ups!' })
            else
                notification.alert(error.data.message, { title: 'Ups!' })
        })
    }
}