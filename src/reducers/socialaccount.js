import {
    SOCIAL_ACCOUNTS_LOADED,
    SOCIAL_SCHEDULETIME_UPDATED
} from '../actions/socialaccount'

const defaultState = {
    isFetching: false,
    data: {},
    activeIndex: -1
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
                        ...{ scheduleTime: action.scheduleTime }
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
                ...{ data: data }
            }
        default: return state
    }
};

export default socialaccount;