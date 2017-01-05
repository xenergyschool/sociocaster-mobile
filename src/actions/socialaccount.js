import * as api from '../api'
import { notification } from 'onsenui'
import * as postActions from './post'

export const SOCIAL_ACCOUNTS_LOADED = 'SOCIAL_ACCOUNTS_LOADED'
export const SOCIAL_ACCOUNTS_SWITCH = 'SOCIAL_ACCOUNTS_SWITCH'
export const SOCIAL_SCHEDULETIME_UPDATED = 'SOCIAL_SCHEDULETIME_UPDATED'

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
            let activeIndex = response.data.items.length > 1 ? 0 : -1
            if (mode == 'refresh') {
                activeIndex = getState().socialaccount.activeIndex
            }
            dispatch({
                type: SOCIAL_ACCOUNTS_LOADED,
                data: {
                    data: response.data,
                    isFetching: false,
                    activeIndex: activeIndex
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

export const updateScheduleTimes = (data) => {

    return (dispatch, getState) => {
        const state = getState()
        let activeId = state.socialaccount.data.items[state.socialaccount.activeIndex].scheduleTime.id
        dispatch({
            type: SOCIAL_ACCOUNTS_LOADED,
            data: {
                isUpdating: true
            }
        })

        return api.patch(`/scheduletimes/${activeId}`, data).then((response) => {
            dispatch({
                type: SOCIAL_SCHEDULETIME_UPDATED,
                data: {
                    isUpdating: false,
                    scheduleTime: response.data
                }
            })
            return response
        }).catch((error) => {
            dispatch({
                type: SOCIAL_ACCOUNTS_LOADED,
                data: {
                    isUpdating: false
                }
            })
            return Promise.reject(error)
        })
    }
}