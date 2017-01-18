import mixpanel from 'mixpanel-browser'
import { Promise } from 'es6-promise'


mixpanel.init('143fd7b90d0ddb51102ae8236e5a9639')

export const track = (event_name, properties = {}) => {

    return new Promise((resolve, reject) => {
        mixpanel.track(event_name, properties, (data) => {
            resolve(data)
        })
    })


}

export const setUser = (user) => {

    return new Promise((resolve, reject) => {
        mixpanel.identify(user.id)
        mixpanel.people.set(user, (data) => {
            resolve(data)
        })
    })
}

