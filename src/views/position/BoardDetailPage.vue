<template>
  <div class="detail_container">
    <div class="detail_tb">
      <div class="tb_info">
        <h3>기본정보</h3>
      </div>
      <table class="table hz">
        <tbody class="tb1">
        <tr>
          <th>상태</th>
          <td colspan="3">
            <div style="display: flex">
              <div style="margin-right: 10px">
                <input type="radio" id="taxY2" name="taxY2" value="1" :checked="status == 1" @click="change(1)">
                <label for="taxY2">정상</label>
              </div>
              <div>
                <input type="radio" id="taxN2" name="taxN2" value="2" :checked="status == 2" @click="change(2)">
                <label for="taxN2">삭제</label>
              </div>
              <div>
                <input type="radio" id="taxN3" name="taxN3" value="9" :checked="status == 9" @click="change(9)">
                <label for="taxN3">정지</label>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>글타입</th>
          <td colspan="3">
            <div style="display: flex">
              <div style="margin-right: 10px">
                <input type="radio" id="p1" name="p1" value="0" :checked="postType == 0" @click="change2(0)">
                <label for="p1">일반</label>
              </div>
              <div>
                <input type="radio" id="p2" name="p2" value="1" :checked="postType == 1" @click="change2(1)">
                <label for="p2">이미지</label>
              </div>
              <div>
                <input type="radio" id="p3" name="p3" value="2" :checked="postType == 2" @click="change2(2)">
                <label for="p3">추천</label>
              </div>
              <div>
                <input type="radio" id="p4" name="p4" value="3" :checked="postType == 3" @click="change2(3)">
                <label for="p4">베스트</label>
              </div>
              <div>
                <input type="radio" id="p5" name="p5" value="3" :checked="postType == 98" @click="change2(98)">
                <label for="p5">이벤트</label>
              </div>
              <div>
                <input type="radio" id="p6" name="p6" value="3" :checked="postType == 99" @click="change2(99)">
                <label for="p6">공지</label>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>작성자</th>
          <td >
            {{this.board.writer}}
          </td>
          <th>ip</th>
          <td >
            {{this.board.ip || '관리자 등록'}}
          </td>
        </tr>
        <tr>
          <th>라인</th>
          <td >
            {{getLine(this.board.lineType)}}
          </td>
          <th>작성타입</th>
          <td >
            {{getWriter(this.board.writerType)}}
          </td>
        </tr>
        <tr>
          <th>등록일</th>
          <td >
            {{this.board.regDt}}
          </td>
          <th>게시글번호(Key)</th>
          <td >
            {{this.board.boardId}}
          </td>
        </tr>
        <tr>
          <th>댓글수</th>
          <td >
            {{this.board.commentCount}}
          </td>
          <th>추천수</th>
          <td >
            {{this.board.recommendCount}}
          </td>
        </tr>
        <tr>
          <th>조회수</th>
          <td >
            {{this.board.view}}
          </td>
          <th>신고수</th>
          <td >
            {{this.board.report}}
          </td>
        </tr>
        <tr>
          <th>제목</th>
          <td colspan="3">
            <input class="input dinput" style="width: 80%" type="text"  v-model="title" />
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td colspan="3">
              <textarea
                  class="input memo"
                  v-model="content"
              ></textarea>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="detail_tb">
      <div class="tb_info">
        <h3>등록 이미지</h3>
      </div>
      <table class="table">
        <tbody class="tb1">
        <template v-for="(item, index) in files">
          <tr :key="index">
            <th>이미지</th>
            <td colspan="3">
              <img :src="item.path" >
              <p>
                원본 파일명: {{item.oriName}} / 로우지지 파일명: {{item.newName}} / 사이즈 : {{item.size}}byte
              </p>
            </td>
            <td style="border-left:none"></td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>

    <div class="bottom_btn">
      <button type="button" class="btn cancle" @click="back">뒤로가기</button>
      <button type="button" class="btn update" @click="update" >상태변경</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import commonHelpler from "@/store/modules/common/helper";
import cookies from "vue-cookies";
import cookieCont from "@/constants/cookieCont";
import service from "@/http/service";
import FindBoardDetailRequest from "@/dto/board/FindBoardDetailRequest";
import UpdateBoardStatusRequest from "@/dto/board/UpdateBoardStatusRequest";


export default {
  name: "BoardPage",
  data () {
    return {
      board: {},
      status: 0,
      postType: 0,
      files: [],
      title: '',
      content: ''
    }
  },
  computed: {
    ...mapGetters(commonHelpler.name, commonHelpler.getters),
    isLogin () {
      return cookies.isKey(cookieCont.AUTH_COOKIE_NAME)
    },
  },
  mounted() {
    if (!this.isLogin) {
      window.location.replace('/lawgg-ad')
    }
    const id = this.$route.query.id
    this.find(id)
  },
  methods: {
    back() {
      window.history.back()
    },
    change(status) {
      this.status = status
    },
    change2(type) {
      this.postType = type
    },
    find(id) {
      const param = new FindBoardDetailRequest(id);
      service.findBoardDetail(param).then(res => {
        if (res.data.resultCode == '00000') {
          this.board = res.data.board
          this.postType = this.board.postType
          this.status = this.board.status
          this.files = res.data.files
          this.title = res.data.board.title
          this.content = res.data.board.content
        } else {
          alert('조회실패')
        }
      }).catch(() => alert('조회실패'))
    },
    getLine(type) {
      switch (type) {
        case 0: return "탑";
        case 1 : return "정글";
        case 2: return "미드";
        case 3: return "원딜";
        case 4: return "서폿";
        case 5: return "전체";
      }
    },
    getPost(type) {
      switch (type) {
        case 0: return "일반";
        case 1 : return "이미지";
        case 2: return "추천";
        case 3: return "베스트";
        case 98: return "이벤트";
        case 99: return "공지";
      }
    },
    getWriter(type) {
      switch (type) {
        case 0: return "비회원";
        case 1 : return "회원";
        case 2: return "로펌";
      }
    },
    update() {
      const param = new UpdateBoardStatusRequest(this.board.boardId, this.status, this.postType, this.title, this.content)
      service.updateBoardStatus(param).then(res => {
        if (res.data.resultCode == '00000') {
          alert('수정성공')
          window.history.back()
        } else {
          alert('수정실패')
        }
      }).catch(() => alert('수정실패'))
    }
  },
}
</script>

<style scoped>

</style>
