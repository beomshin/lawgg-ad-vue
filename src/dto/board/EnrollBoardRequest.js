class EnrollUserBoardRequestDto {
    writer; // 작성자
    title; // 제목
    content; // 내용
    files; // 파일
    type; // 타입

    constructor(
        writer,
        title,
        content,
        files,
        type
    ){
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.files = files;
        this.type = type
    }
}

export default EnrollUserBoardRequestDto