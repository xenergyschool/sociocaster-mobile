
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const convertToHTML = (content) => {

    return content.replace(/(?:\r\n|\r|\n)/g, '<br/>')
}

