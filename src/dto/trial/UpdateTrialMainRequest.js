class UpdateTrialMainRequest {
    id;
    type;
    mainPostType;

    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.mainPostType = type;
    }
}

export default UpdateTrialMainRequest
