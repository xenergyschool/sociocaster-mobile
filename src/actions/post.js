import axios from 'axios'
import * as api from '../api'
import { notification } from 'onsenui'
import { Promise } from 'es6-promise'

export const POST_LOADED = 'POST_LOADED';
export const POST_MORE_LOADED = 'POST_MORE_LOADED'
export const POST_DELETED = 'POST_DELETED'
export const POST_DATA_CHANGED = 'POST_DATA_CHANGED'
let CancelToken = axios.CancelToken;
let source = CancelToken.source();

export const get = (mode = 'normal') => {

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
        if (mode == 'normal') {

            dispatch({
                type: POST_LOADED,
                data: {
                    isFetching: true
                }
            })
        }

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

export const remove = () => {

    return (dispatch, getState) => {
        let state = getState()
        let activeItem = state.post.data.items[state.post.activeIndex]
        return api.remove(`/posts/${activeItem.id}`).then((response) => {
            console.log(response)
            dispatch({
                type: POST_DELETED
            })
            return response
        }).catch((response) => {
            console.log(response)
            Promise.reject(response)
        })
    }
}

export const switchFilter = (filter) => {

    return {
        type: POST_LOADED,
        data: {
            filter: filter
        }
    }
}

export const switchIndex = (index) => {

    return {
        type: POST_LOADED,
        data: {
            activeIndex: index
        }
    }
}

export const uploadFile = (fileURL) => {

    return (dispatch, getState) => {
        let options = {
            fileKey: 'UploadForm[imageFiles][]'
        }
        return api.upload(`${SC_API}/media/upload`, fileURL, options).then((response) => {

            if (response.data[0] && response.data[0].success) {

                return Promise.resolve(response.data[0])
            } else {
                return Promise.reject(response.data[0])
            }

        }).catch((error) => {

            return Promise.reject(error)
        })
    }
}

export const updatePostData = () => {
    return (dispatch, getState) => {

    }
}

export const postDataChanged = (data) => {
    return {
        type: POST_LOADED,
        data: {
            ...data
        }
    }
}

export const getLinkPreview = (url) => {
    return (dispatch, getState) => {
        let state = getState()
        dispatch({
            type: POST_LOADED,
            data: {
                isUploading: true,
                postData: {
                    ...state.post.postData,
                    ...{
                        link: url,
                        type: 'customlink'
                    }
                }
            }
        })

        return api.get(`/posts/linkpreview?url=${url}`).then((response) => {
            state = getState()
            dispatch({
                type: POST_LOADED,
                data: {
                    isUploading: false,
                    linkPicturePreview: response.data.image,
                    postData: {
                        ...state.post.postData,
                        ...{
                            linkname: response.data.title,
                            linkdescription: response.data.description,
                            linkpicture: response.data.image,
                            linkcaption: response.data.canonicalUrl
                        }
                    }
                }
            })

            return Promise.resolve(response)

        }).catch((error) => {
            state = getState()
            dispatch({
                type: POST_LOADED,
                data: {
                    isUploading: false,
                    postData: {
                        ...state.post.postData,
                        ...{
                            type: 'text'
                        }
                    }
                }
            })

            return Promise.reject(error)
        })
    }
}