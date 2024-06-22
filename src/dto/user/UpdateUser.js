class UpdateUser {

    id;
    status;
    delFlag;
    judgeFlag;
    authFlag;
    tierId;

    constructor(id, status, delFlag, judgeFlag, authFlag, tierId) {
        this.id = id;
        this.status = status;
        this.delFlag = delFlag;
        this.judgeFlag = judgeFlag;
        this.authFlag = authFlag
        this.tierId = tierId;
    }

}

export default UpdateUser
