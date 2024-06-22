import axios from "../plugins/axios"

export default (url, params, headers) => {
    return axios({
        method: 'get'
        , headers: headers
        , url: url
        , params: params
    })
    .then(res => {
        return res;
    })
}
