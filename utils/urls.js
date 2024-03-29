export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

/**
 * Given an image, return the url
 * Works for local and deployed strapis
 * @param {any} image 
 */
export const fromImagetoUrl = (image) => {
    if (!image) {
        return '/vercel.svg'
    }

    if (image.url.indexOf('/') === 0) { // relative path 
        return `${API_URL}${image.url}`
    }

    return image.url
}