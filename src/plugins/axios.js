import axios from "axios";
import Endpoint from "@/http/endpoint";
import cookies from "vue-cookies";
import CookieCont from "@/constants/cookieCont";

const instance = axios.create({
    timeout: 3000,
    baseURL: '/lawgg-ad-spring'
})

const getAccessToken = () => {
    if (cookies.get(CookieCont.AUTH_REFRESH_COOKIE_NAME)) {
        window.location.reload()
    } else {
        window.location.replace('/lawgg-ad')
    }
}

instance.interceptors.request.use(config => {
    console.log(config)
    if (config.url == Endpoint.ENROLL_USER_TRIAL) { // 트라이얼 등록 timeout
        config.timeout = 15000
    }
    return config
})

instance.interceptors.response.use(res => {
    console.log(res)
    return res
}, (err) => {
    console.log(err)
    if (err.response.status == 403) getAccessToken()
})

export default instance
