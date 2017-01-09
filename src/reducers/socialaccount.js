import {
    SOCIAL_ACCOUNTS_LOADED,
    SOCIAL_SCHEDULETIME_UPDATED,
    SOCIAL_ACCOUNT_DELETED,
    SOCIAL_ACCOUNT_SELECTED,
    SOCIAL_ACCOUNT_UNSELECTED
} from '../actions/socialaccount'

const defaultState = {
    isFetching: false,
    data: {},
    activeIndex: -1,
    isUpdating: false,
    selectedSocialaccounts: []
};

const socialaccount = (state = defaultState, action) => {
    let data, items
    switch (action.type) {
        case SOCIAL_ACCOUNTS_LOADED:
            return {
                ...state,
                ...action.data
            }
        case SOCIAL_SCHEDULETIME_UPDATED:
            items = state.data.items.map((item, index) => {
                if (index == state.activeIndex) {
                    return {
                        ...item,
                        ...{ scheduleTime: action.data.scheduleTime }
                    }
                }
                return item
            })

            data = {
                ...state.data,
                ...{ items: items }
            }
            return {
                ...state,
                ...{ data: data, isUpdating: action.data.isUpdating }
            }
        case SOCIAL_ACCOUNT_DELETED:
            items = [
                ...state.data.items.slice(0, state.activeIndex),
                ...state.data.items.slice(state.activeIndex + 1)
            ]

            data = {
                ...state.data,
                ...{ items: items }
            }
            return {
                ...state,
                ...{ data: data, activeIndex: items.length > 0 ? 0 : -1 }
            }
        case SOCIAL_ACCOUNT_SELECTED:
            let selected = [...new Set([
                ...state.selectedSocialaccounts,
                action.data.id
            ])]

            return {
                ...state,
                ...{
                    selectedSocialaccounts: selected
                }
            }
        case SOCIAL_ACCOUNT_UNSELECTED:
            let index = state.selectedSocialaccounts.indexOf(action.data.id)
            if (index > -1) {
                let selectedSocialaccounts = [
                    ...state.selectedSocialaccounts.slice(0, index),
                    ...state.selectedSocialaccounts.slice(index + 1)
                ]
                return {
                    ...state,
                    ...{
                        selectedSocialaccounts: selectedSocialaccounts
                    }
                }
            }
            return state
        default: return state
    }
};

export default socialaccount;