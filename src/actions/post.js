import axios from 'axios'
import * as api from '../api'
import { notification } from 'onsenui'

export const POST_LOADED = 'POST_LOADED';
export const POST_MORE_LOADED = 'POST_MORE_LOADED'


let CancelToken = axios.CancelToken;
let source = CancelToken.source();

export const get = () => {

    return (dispatch, getState) => {

        let state = getState()

        let socialaccountId = state.socialaccount.data.items[state.socialaccount.activeIndex].id


        if (state.post.isFetching) {
            // console.log(source.token)
            source.cancel('cancel-request')

            source = CancelToken.source()
            //console.log(source.token)
        }
        let config = {
            cancelToken: source.token
        }

        dispatch({
            type: POST_LOADED,
            data: {
                isFetching: true
            }
        })

        return api.get(`/posts?status=${state.post.filter}&socialaccount=${socialaccountId}`, config).then((response) => {

            dispatch({
                type: POST_LOADED,
                data: {
                    data: response.data,
                    isFetching: false,

                }
            })
        }).catch((response) => {

            if (axios.isCancel(response)) {

                dispatch({
                    type: POST_LOADED,
                    data: {
                        isFetching: true
                    }
                })
            } else {
                dispatch({
                    type: POST_LOADED,
                    data: {
                        isFetching: false
                    }
                })
            }


        })

    }
}
export const getMore = () => {
    return (dispatch, getState) => {

        let state = getState()


        let config = {
            cancelToken: source.token
        }
        if (state.socialaccount.isFetchingMore) {
            source.cancel()
        }
        dispatch({
            type: POST_LOADED,
            data: {
                isFetchingMore: true
            }
        })

        return api.get(state.post.data._links.next.href, config).then((response) => {

            dispatch({
                type: POST_MORE_LOADED,
                data: {
                    data: response.data,
                    isFetchingMore: false,

                }
            })
        }).catch((response) => {
            dispatch({
                type: POST_LOADED,
                data: {
                    isFetchingMore: false
                }
            })
        })

    }
}