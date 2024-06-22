import post from '../../post'
import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'

export default {
    normalLogin: (data) => {
        return post(EndPoint.NORMAL_LOGIN, data, HeaderUtils.NORMAL)
    }
}
