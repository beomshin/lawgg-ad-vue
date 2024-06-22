import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import get from "@/http/get";
import post from "@/http/post";

export default {
    findBoards: (data) => {
        return get(EndPoint.FIND_BOARD_LIST, data, HeaderUtils.AUTH_HEADER())
    },
    findBoardDetail: (data) => {
        return get(EndPoint.FIND_BOARD_DETAIL, data, HeaderUtils.AUTH_HEADER())
    },
    updateBoardStatus: (data) => {
        return post(EndPoint.UPDATE_BOARD_STATUS, data, HeaderUtils.AUTH_HEADER())
    },
    updateBoardMain: (data) => {
        return post(EndPoint.UPDATE_BOARD_MAIN, data, HeaderUtils.AUTH_HEADER())
    },
    enrollBoard: (data) => {
        return post(EndPoint.ENROLL_BOARD, data, HeaderUtils.AUTH_MULTIPART_HEADER())
    }


}
