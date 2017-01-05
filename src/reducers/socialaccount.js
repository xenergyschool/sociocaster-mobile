import {
    SOCIAL_ACCOUNTS_LOADED,
    SOCIAL_SCHEDULETIME_UPDATED,
    SOCIAL_ACCOUNT_DELETED
} from '../actions/socialaccount'

const defaultState = {
    isFetching: false,
    data: {},
    activeIndex: -1,
    isUpdating: false
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
                ...{ data: data }
            }
        default: return state
    }
};

export default socialaccount;