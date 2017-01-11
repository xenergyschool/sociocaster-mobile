import {
    POST_LOADED,
    POST_MORE_LOADED,
    POST_DELETED,
    POST_DATA_CHANGED
} from '../actions/post'
import moment from 'moment'

const m = moment()
const defaultState = {
    filter: 'scheduled',
    data: {},
    isFetching: false,
    isFetchingMore: false,
    activeIndex: -1,
    postData: {
        type: 'text',
        message: '',
        picture: '',
        link: '',
        linkname: '',
        linkdescription: '',
        linkcaption: '',
        linkpicture: '',
        datetime: m.format('YYYY-MM-DD HH:mm:ss')

    }
};

const post = (state = defaultState, action) => {
    let data, items, _links, _meta, postData
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
        case POST_DELETED:
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
        case POST_DATA_CHANGED:
            postData = {
                ...state.postData,
                ...action.data
            }
            return {
                ...state,
                ...{
                    postData: postData
                }
            }
        default: return state
    }
};

export default post;