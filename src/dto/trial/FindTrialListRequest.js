class FindTrialListRequest {
    page;
    pageNum;
    keyword;
    type
    liveType
    endType
    statusType

    constructor(page, pageNum, keyword, type, type2, type3, type4) {
        this.page = page;
        this.pageNum = pageNum;
        this.keyword = keyword;
        this.type = type;
        this.liveType = type2;
        this.endType = type3
        this.statusType = type4
    }
}

export default FindTrialListRequest
