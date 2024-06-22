class UpdateLawFirmRequest {
    id;
    title;
    introduction;
    userId;
    profile;
    background;
    memo
    status;

    constructor(id, title, introduction, userId, profile, background, memo, status) {
        this.id = id;
        this.title = title;
        this.introduction = introduction;
        this.userId = userId;
        this.profile = profile;
        this.background = background;
        this.memo = memo;
        this.status = status
    }
}

export default UpdateLawFirmRequest