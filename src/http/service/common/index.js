import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import get from "@/http/get";
import ParamsUtils from "@/http/ParamsUtils";

export default {
    findTiers: () => {
        return get(EndPoint.FIND_TIERS, ParamsUtils.NORMAL, HeaderUtils.AUTH_HEADER)
    }
}
