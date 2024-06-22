import CookieCont from '../constants/cookieCont'
import cookies from 'vue-cookies'

const NORMAL = {}
let AUTH_HEADER = () => {
    if (!cookies.get(CookieCont.AUTH_COOKIE_NAME)) {
        return null
    }
    return { Authorization: 'Bearer ' + cookies.get(CookieCont.AUTH_COOKIE_NAME) }
}
const MULTIPART_HEADER = {"Content-Type" : 'multipart/form-data'}
const AUTH_MULTIPART_HEADER = () => { return { ...AUTH_HEADER(), ...MULTIPART_HEADER } }


const HEADERS = {
    NORMAL,
    AUTH_HEADER,
    MULTIPART_HEADER,
    AUTH_MULTIPART_HEADER
}

export default HEADERS
