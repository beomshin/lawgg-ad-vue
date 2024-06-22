class FindUsersRequest {

    page;
    pageNum;
    keyword;
    statusType;
    snsType;
    orderType;

    constructor(page, pageNum, keyword, type, type2, type3) {
        this.page = page;
        this.pageNum = pageNum;
        this.keyword = keyword;
        this.statusType = type;
        this.snsType = type2;
        this.orderType = type3;
    }

}

export default FindUsersRequest
