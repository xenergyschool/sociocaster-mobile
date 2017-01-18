import * as api from '../api'
import { notification } from 'onsenui'
import * as postActions from './post'
import * as mixpanel from '../helpers/mixpanel'

export const SOCIAL_ACCOUNTS_LOADED = 'SOCIAL_ACCOUNTS_LOADED'
export const SOCIAL_ACCOUNTS_SWITCH = 'SOCIAL_ACCOUNTS_SWITCH'
export const SOCIAL_SCHEDULETIME_UPDATED = 'SOCIAL_SCHEDULETIME_UPDATED'
export const SOCIAL_ACCOUNT_DELETED = 'SOCIAL_ACCOUNT_DELETED'
export const SOCIAL_ACCOUNT_SELECTED = 'SOCIAL_ACCOUNT_SELECTED'
export const SOCIAL_ACCOUNT_UNSELECTED = 'SOCIAL_ACCOUNT_UNSELECTED'
export const SOCIAL_ACCOUNT_SELECTED_RESET = 'SOCIAL_ACCOUNT_SELECTED_RESET'

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

            if (activeIndex > -1) {
                dispatch({
                    type: SOCIAL_ACCOUNT_SELECTED,
                    data: response.data.items[activeIndex]
                })
            }
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
        mixpanel.track('switch-socialaccount')
        const state = getState()
        dispatch({
            type: SOCIAL_ACCOUNT_SELECTED_RESET
        })
        dispatch({
            type: SOCIAL_ACCOUNTS_LOADED,
            data: {
                activeIndex: index
            }
        })
        dispatch({
            type: SOCIAL_ACCOUNT_SELECTED,
            data: state.socialaccount.data.items[index]
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
            mixpanel.track('update-socialaccount-scheduletime')
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

export const remove = () => {

    return (dispatch, getState) => {
        let state = getState()
        let activeItem = state.socialaccount.data.items[state.socialaccount.activeIndex]
        return notification.confirm(`Are you sure want to delete ${activeItem.displayName} (${activeItem.provider} ${activeItem.type}) from Sociocaster?`).then((response) => {
            if (response > 0) {
                return api.remove(`/socialaccounts/${activeItem.id}`).then((response) => {
                    mixpanel.track('remove-socialaccount')
                    dispatch({
                        type: SOCIAL_ACCOUNT_DELETED
                    })
                    return response
                }).catch((response) => {
                    console.log(response)
                    return Promise.reject(response)
                })
            } else {
                return Promise.reject('cancel')
            }
        }).catch((error) => {
            console.log(error)
            return Promise.reject(error)
        })
    }
}

export const selectSocialAccount = (index) => {

    return (dispatch, getState) => {
        mixpanel.track('select-socialaccount')
        const state = getState()
        const selected = state.socialaccount.data.items[index]
        let isAdded = state.socialaccount.selectedSocialaccounts.indexOf(selected.id)

        let actionType = SOCIAL_ACCOUNT_SELECTED

        if (isAdded > -1) {
            actionType = SOCIAL_ACCOUNT_UNSELECTED
        }

        if (actionType == SOCIAL_ACCOUNT_UNSELECTED && state.socialaccount.selectedSocialaccounts.length <= 1) {
            notification.alert('You have to choose at least one social account!')

        } else {

            dispatch({
                type: actionType,
                data: selected
            })
        }





    }
}