import * as api from '../api'
import { notification } from 'onsenui'

export const SOCIAL_ACCOUNTS_LOADED = 'SOCIAL_ACCOUNTS_LOADED';



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