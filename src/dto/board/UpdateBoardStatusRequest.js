class UpdateBoardStatusRequest {
    id;
    status;
    type
    title
    content

    constructor(id, status, type, title, content) {
        this.id = id;
        this.status = status;
        this.type = type;
        this.title = title;
        this.content = content;
    }
}

export default UpdateBoardStatusRequest