class FindBoardListRequest {
    page;
    pageNum;
    keyword;
    type;
    type2;
    type3;

    constructor(page, pageNum, keyword, type, type2, type3) {
        this.page = page;
        this.pageNum = pageNum;
        this.keyword = keyword;
        this.type = type;
        this.type2 = type2;
        this.type3 = type3;
    }

}

export default FindBoardListRequest
