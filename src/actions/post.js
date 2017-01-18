import axios from 'axios'
import * as api from '../api'
import { notification } from 'onsenui'
import { Promise } from 'es6-promise'
import * as mixpanel from '../helpers/mixpanel'

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
            mixpanel.track('posts', { filter: state.post.filter })
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
            mixpanel.track('remove-post', { id: activeItem.id })
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
            mixpanel.track('upload-file')
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
                isSomethingChange: true,
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
            mixpanel.track('link-preview')
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

export const schedule = (mode) => {

    return (dispatch, getState) => {
        let state = getState()
        let params = {
            ...state.post.postData,
            ...{
                mode: mode,
                socialaccounts: JSON.stringify(state.socialaccount.selectedSocialaccounts)
            }
        }
        let activeSocialaccount = state.socialaccount.data.items[state.socialaccount.activeIndex]
        console.log(params)
        dispatch({
            type: POST_LOADED,
            data: { isScheduling: true }
        })

        let url = `${SC_API}/posts`

        return api.post(url, params).then((response) => {
            mixpanel.track('create-post')
            dispatch({
                type: POST_LOADED,
                data: {
                    isScheduling: false,
                    isSomethingChange: false
                }
            })


            let activeItem = response.data.find((item) => (item.socialaccount == activeSocialaccount.id))

            if (activeItem) {
                if ((state.post.filter == 'scheduled' && params.mode == 'schedule') || (state.post.filter == 'queue' && params.mode == 'now')) {

                    let posts = [
                        ...state.post.data.items,
                        activeItem
                    ]

                    let sortedPosts = posts.sort((a, b) => (a.utc_datetime_int - b.utc_datetime_int))

                    let data = {
                        ...state.post.data,
                        ...{
                            items: sortedPosts
                        }
                    }
                    dispatch({
                        type: POST_LOADED,
                        data: {
                            data: data
                        }
                    })
                }

            }

            return Promise.resolve(response)
        }).catch((error) => {
            dispatch({
                type: POST_LOADED,
                data: {
                    isScheduling: false
                }
            })

            if (error.data[0])
                notification.alert(error.data[0].message, { title: 'Ups!' })
            else
                notification.alert(error.data.message, { title: 'Ups!' })

            return Promise.reject(error)
        })
    }
}

export const update = () => {

    return (dispatch, getState) => {
        const state = getState()
        let activePost = state.post.data.items[state.post.activeIndex]
        dispatch({
            type: POST_LOADED,
            data: {
                isScheduling: true
            }
        })

        let data = state.post.postData

        return api.patch(`/posts/${activePost.id}`, data).then((response) => {
            mixpanel.track('update-post')
            dispatch({
                type: POST_LOADED,
                data: {
                    isScheduling: false,
                    isSomethingChange: false

                }
            })


            if (state.post.filter == 'scheduled') {



                let posts = state.post.data.items.map((item, index) => {
                    if (activePost.id == item.id) {
                        return {
                            ...response.data
                        }
                    }
                    return item
                })

                let sortedPosts = posts.sort((a, b) => (a.utc_datetime_int - b.utc_datetime_int))

                let data = {
                    ...state.post.data,
                    ...{
                        items: sortedPosts
                    }
                }
                dispatch({
                    type: POST_LOADED,
                    data: {
                        data: data
                    }
                })
            }
            return Promise.resolve(response)
        }).catch((error) => {
            if (error.data[0])
                notification.alert(error.data[0].message, { title: 'Ups!' })
            else
                notification.alert(error.data.message, { title: 'Ups!' })
            dispatch({
                type: POST_LOADED,
                data: {
                    isScheduling: false,
                    isSomethingChange: false
                }
            })
            return Promise.reject(error)
        })
    }
}