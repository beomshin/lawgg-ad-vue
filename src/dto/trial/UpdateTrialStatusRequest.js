class UpdateTrialStatusRequest {

      id;
      status;
      mainPostType;
      postType;
      liveType;
      endingType;
      precedent;
      lawFirmDefense;
      title;
      content;
      altVideoUrl;

      constructor(
          id,
        status,
        postType,
        mainPostType,
        liveType,
        endingType,
        precedent,
        lawFirmDefense,
          title,
          content,
          altVideoUrl
      ) {
          this.id = id;
          this.status = status;
          this.postType = postType;
          this.mainPostType = mainPostType;
          this.liveType = liveType;
          this.endingType = endingType;
          this.precedent = precedent;
          this.lawFirmDefense = lawFirmDefense
          this.title = title;
          this.content = content;
          this.altVideoUrl = altVideoUrl;
      }
}

export default UpdateTrialStatusRequest
