import axios from "../plugins/axios"

export default (url, data, headers) => {
    return axios({
        method: 'post'
        , headers: headers
        , url: url
        , data: data
    })
    .then(res => {
        return res;
    })
}
