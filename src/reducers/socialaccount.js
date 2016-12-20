import {
    SOCIAL_ACCOUNTS_LOADED
} from '../actions/socialaccount'

const defaultState = {
    isFetching: false,
    data: {},
    activeIndex: -1
};

const socialaccount = (state = defaultState, action) => {

    switch (action.type) {
        case SOCIAL_ACCOUNTS_LOADED:
            return {
                ...state,
                ...action.data
            }
        default: return state
    }
};

export default socialaccount;