import {
    POST_LOADED,
    POST_MORE_LOADED
} from '../actions/post'

const defaultState = {
    filter: 'scheduled',
    data: {},
    isFetching: 'false',
    isFetchingMore: false
};

const post = (state = defaultState, action) => {
    let data, items, _links, _meta
    switch (action.type) {
        case POST_LOADED:
            return {
                ...state,
                ...action.data
            }
        case POST_MORE_LOADED:

            items = [
                ...state.data.items,
                ...action.data.data.items
            ]

            data = {
                items: items,
                _links: action.data.data._links,
                _meta: action.data.data._meta

            }

            return {
                ...state,
                ...{ data: data },
                ...{ isFetchingMore: action.data.isFetchingMore }
            }
        default: return state
    }
};

export default post;