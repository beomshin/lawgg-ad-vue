import auth from "@/http/endpoint/auth";
import lawFirm from "@/http/endpoint/lawFirm";
import board from "@/http/endpoint/board";
import trial from "@/http/endpoint/trial";
import user from '@/http/endpoint/user'
import common from '@/http/endpoint/common'

export default  {
    ...auth,
    ...lawFirm,
    ...board,
    ...trial,
    ...user,
    ...common
}
