import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import get from "@/http/get";
import post from "@/http/post";

export default {
    findLawFirm: (data) => {
        return get(EndPoint.FIND_LAW_FIRM, data, HeaderUtils.AUTH_HEADER())
    },
    findLawFirmUser: (data) => {
        return get(EndPoint.FIND_LAW_FIRM_USER, data, HeaderUtils.AUTH_HEADER())
    },
    enrollLawFirm: (data) => {
        return post(EndPoint.ENROLL_LAW_FIRM, data, HeaderUtils.AUTH_MULTIPART_HEADER())
    },
    findLawFirmDetail: (data) => {
        return get(EndPoint.FIND_LAW_FIRM_DETAIL, data, HeaderUtils.AUTH_HEADER())
    },
    updateLawFirm: (data) => {
        return post(EndPoint.UPDATE_LAW_FIRM, data, HeaderUtils.AUTH_MULTIPART_HEADER())
    },
    findLawFirmUsers: (data) => {
        return get(EndPoint.FIND_LAW_FIRM_USERS, data, HeaderUtils.AUTH_HEADER())
    },
    findLawFirmApplyUsers: (data) => {
        return get(EndPoint.FIND_LAW_FIRM_APPLY_USERS, data, HeaderUtils.AUTH_HEADER())
    },
    acceptLawFirm: (data) => {
        return post(EndPoint.ACCEPT_LAW_FIRM, data, HeaderUtils.AUTH_HEADER())
    },
}
