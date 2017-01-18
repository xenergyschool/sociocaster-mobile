import * as api from '../api'
import { notification } from 'onsenui'
import * as socialaccountActions from './socialaccount'
import WelcomPage from '../containers/WelcomePage'
import { Promise } from 'es6-promise'
import * as mixpanel from '../helpers/mixpanel'

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS'

export const init = () => {

    return (dispatch, getState) => {

        api.get('/users').then((response) => {
            let jwt = ''
            if (localStorage.getItem('sc-auth')) {
                jwt = JSON.parse(localStorage.getItem('sc-auth')).jwt
            }
            let user = {
                ...response.data,
                ...{
                    '$first_name': response.data.username,
                    '$email': response.data.email
                }
            }
            mixpanel.setUser(user)
            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    user: response.data,
                    isLoggedIn: response.success,
                    jwt: jwt,
                    isChecking: false,
                    isLoggingIn: false
                }
            })
            dispatch(socialaccountActions.get())

        }).catch((response) => {
            mixpanel.track('welcome-page')
            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    isLoggedIn: response.success,
                    isChecking: false,
                    isLoggingIn: false
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
                isLoggingIn: true

            }
        })

        api.post('/app/mobilelogin', data, config).then((response) => {
            mixpanel.track('login')
            localStorage.setItem('sc-auth', JSON.stringify(response.data))

            api.setting()
            dispatch(init())
        }).catch((error) => {
            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    isLoggedIn: false,
                    isLoggingIn: false
                }
            })
            if (error.data.message.username)
                notification.alert(error.data.message.username[0], { title: 'Ups!' })
            else
                notification.alert(error.data.message, { title: 'Ups!' })
        })
    }
}

export const signup = (data) => {
    return (dispatch, getState) => {


        dispatch({
            type: AUTH_SUCCESS,
            data: {
                isRegistering: true
            }
        })

        return api.post('/users', data).then((response) => {
            mixpanel.track('signup')
            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    isRegistering: false
                }
            })

            return response
        }).catch((error) => {

            if (error.data[0])
                notification.alert(error.data[0].message, { title: 'Ups!' })
            else
                notification.alert(error.data.message, { title: 'Ups!' })

            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    isRegistering: false
                }
            })

            return Promise.reject(error)
        })
    }
}

export const logout = (navigator = 'normal') => {
    return (dispatch, getState) => {
        notification.confirm('Are you sure want to sign out?').then((response) => {
            if (response > 0) {
                mixpanel.track('logout')
                localStorage.removeItem('sc-auth')
                if (navigator !== 'normal') {
                    navigator.pushPage({ component: WelcomPage, key: 'WELCOME_PAGE' })
                }
                dispatch({
                    type: AUTH_SUCCESS,
                    data: {
                        isLoggedIn: false
                    }
                })
            }
        })



    }
}

export const resetPassword = (data) => {
    return (dispatch, getState) => {


        dispatch({
            type: AUTH_SUCCESS,
            data: {
                isResettingPassword: true
            }
        })


        return api.post('/users/sendresetpasswordlink', data).then((response) => {
            mixpanel.track('reset-password')
            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    isResettingPassword: false
                }
            })
            notification.alert(response.data.message, { title: 'Reset Password' })
            return response
        }).catch((error) => {

            if (error.data[0])
                notification.alert(error.data[0].message, { title: 'Ups!' })
            else
                notification.alert(error.data.message, { title: 'Ups!' })

            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    isResettingPassword: false
                }
            })

            return Promise.reject(error)
        })
    }
}

export const update = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: AUTH_SUCCESS,
            data: {
                isUpdating: true
            }
        })

        return api.patch('/users', data).then((response) => {
            mixpanel.track('update-user-info')
            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    isUpdating: false,
                    user: response.data
                }
            })
            return response
        }).catch((error) => {
            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    isUpdating: false
                }
            })
            return Promise.reject(error)
        })


    }
}