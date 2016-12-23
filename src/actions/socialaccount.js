import * as api from '../api'
import { notification } from 'onsenui'
import * as postActions from './post'

export const SOCIAL_ACCOUNTS_LOADED = 'SOCIAL_ACCOUNTS_LOADED'
export const SOCIAL_ACCOUNTS_SWITCH = 'SOCIAL_ACCOUNTS_SWITCH'


export const get = (mode = 'normal') => {

    return (dispatch, getState) => {
        if (mode == 'normal') {
            dispatch({
                type: SOCIAL_ACCOUNTS_LOADED,
                data: {
                    isFetching: true
                }
            })
        }
        return api.get('/socialaccounts?expand=scheduleTime').then((response) => {
            dispatch({
                type: SOCIAL_ACCOUNTS_LOADED,
                data: {
                    data: response.data,
                    isFetching: false,
                    activeIndex: response.data.items.length > 1 ? 0 : -1
                }
            })
        }).catch((response) => {
            dispatch({
                type: SOCIAL_ACCOUNTS_LOADED,
                data: {
                    isFetching: false
                }
            })
        })
    }
}

export const switchSocialaccount = (index) => {
    return (dispatch, getState) => {
        dispatch({
            type: SOCIAL_ACCOUNTS_LOADED,
            data: {
                activeIndex: index
            }
        })

        return dispatch(postActions.get())
    }
}