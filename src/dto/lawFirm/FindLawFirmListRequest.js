class FindLawFirmListRequest {
    page;
    pageNum;
    keyword;
    type;

    constructor(page, pageNum, keyword, type) {
        this.page = page;
        this.pageNum = pageNum;
        this.keyword = keyword;
        this.type = type
    }

}

export default FindLawFirmListRequest