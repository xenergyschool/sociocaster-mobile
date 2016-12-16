import * as api from '../api'

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';


export const init = () => {

    return (dispatch, getState) => {

        api.get('/users').then((response) => {
            dispatch({
                type: AUTH_SUCCESS,
                data: {
                    user: response.data.data,
                    isLoggedIn: response.data.success
                }
            })
        }).catch((error) => {
            console.log(error)
        })
    }
}