import * as images from '../images'
import Promise from 'promise';

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const convertToHTML = (content) => {

    return content.replace(/(?:\r\n|\r|\n)/g, '<br/>')
}

export const avatarError = (e) => {
    e.target.src = images.defaultAvatar
}

export const imageError = (e) => {
    e.target.src = images.unavailableImage
}

export const snapPicture = (options = {}) => {

    return new Promise((resolve, reject) => {
        navigator.camera.getPicture(
            (imageData) => {
                resolve(imageData);
            },
            (message) => {
                reject(message)
            },
            {
                ...{
                    quality: 75,
                    destinationType: Camera.DestinationType.FILE_URI,
                    allowEdit: true
                },
                ...options
            }
        )

    })


}
export const choosePicture = (options = {}) => {

    return new Promise((resolve, reject) => {
        navigator.camera.getPicture(
            (imageData) => {

                resolve(imageData);
            },
            (message) => {

                reject(message)
            },
            {
                ...{
                    quality: 75,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
                    allowEdit: true
                },
                ...options
            }
        )
    })

}

