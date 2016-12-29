import * as api from '../api'
import { notification } from 'onsenui'
import * as socialaccountActions from './socialaccount'
import WelcomPage from '../containers/WelcomePage'
import { Promise } from 'es6-promise'

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS'

export const init = () => {

    return (dispatch, getState) => {

        api.get('/users').then((response) => {
            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    user: response.data,
                    isLoggedIn: response.success,
                    isChecking: false,
                    isLoggingIn: false
                }
            })
            dispatch(socialaccountActions.get())
        }).catch((response) => {
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
            console.log(response)
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
            console.log(response)
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
        let c = notification.confirm('Are you sure want to sign out?', {
            callback: (data) => {
                if (data > 0) {
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
            console.log(response)
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