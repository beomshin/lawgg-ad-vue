class EnrollLawFirmRequest {
    title;
    introduction;
    userId;
    profile;
    background;
    memo;

    constructor(title, introduction, userId, profile, background, memo) {
        this.title = title;
        this.introduction = introduction;
        this.userId = userId;
        this.profile = profile;
        this.background = background;
        this.memo = memo
    }

}

export default EnrollLawFirmRequest