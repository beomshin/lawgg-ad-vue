import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import get from "@/http/get";
import post from "@/http/post";

export default {
    findUsers: (data) => {
        return get(EndPoint.FIND_USERS, data, HeaderUtils.AUTH_HEADER())
    },
    updateUserJudge: (data) => {
        return post(EndPoint.UPDATE_USER_JUDGE, data, HeaderUtils.AUTH_HEADER())
    },
    updateUserStatus: (data) => {
        return post(EndPoint.UPDATE_USER_STATUS, data, HeaderUtils.AUTH_HEADER())
    },
    findUserDetail: (data) => {
        return get(EndPoint.FIND_USER_DETAIL, data, HeaderUtils.AUTH_HEADER())
    },
    updateUser: (data) => {
        return post(EndPoint.UPDATE_USER, data, HeaderUtils.AUTH_HEADER())
    },
}
