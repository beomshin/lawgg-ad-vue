import login from "@/http/service/login";
import lawFirm from "@/http/service/lawFirm";
import board from "@/http/service/board";
import trial from '@/http/service/trial'
import user from '@/http/service/user'
import common from "@/http/service/common";

export default {
    ...login,
    ...lawFirm,
    ...board,
    ...trial,
    ...user,
    ...common
}
