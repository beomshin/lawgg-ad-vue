import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import get from "@/http/get";
import post from "@/http/post";

export default {
    findTrial: (data) => {
        return get(EndPoint.FIND_TRIAL, data, HeaderUtils.AUTH_HEADER())
    },
    enrollTrialMain: (data) => {
        return post(EndPoint.ENROLL_TRIAL_MAIN, data, HeaderUtils.AUTH_HEADER())
    },
    setHotTrial: (data) => {
        return post(EndPoint.ENROLL_TRIAL_HOT, data, HeaderUtils.AUTH_HEADER())
    },
    findTrialDetail: (data) => {
        return get(EndPoint.FIND_TRIAL_DETAIL, data, HeaderUtils.AUTH_HEADER())
    },
    updateTrialStatus: (data) => {
        return post(EndPoint.UPDATE_TRIAL_STATUS, data, HeaderUtils.AUTH_HEADER())
    },
    enrollTrialNotice: (data) => {
        return post(EndPoint.ENROLL_TRIAL_NOTICE, data, HeaderUtils.AUTH_MULTIPART_HEADER())
    }
}
