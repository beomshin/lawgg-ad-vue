<template>
  <div class="wrap">
    <div class="content">
      <div class="inner">
        <h2>포지션 게시판 리스트</h2>
      </div>
      <div class="sectionTop">
        <div class="inner">
          <div>
            <div>
              <div class="searchBox">
                <div class="search-col">
                  <span class="spst">상태</span>
                  <div class="order" style="width:100px">
                    <select v-model="type">
                      <option value="9">전체</option>
                      <option value="0">탑</option>
                      <option value="1">정글</option>
                      <option value="2">미드</option>
                      <option value="3">원딜</option>
                      <option value="4">서폿</option>
                    </select>
                  </div>
                </div>
                <div class="search-col">
                  <span class="spst">정렬</span>
                  <div class="order" style="width:100px">
                    <select v-model="type2">
                      <option value="0">댓글수</option>
                      <option value="1">추천수</option>
                      <option value="2">조회수</option>
                      <option value="3">신고수</option>
                    </select>
                  </div>
                </div>
                <div class="search-col">
                  <span class="spst">글타입</span>
                  <div class="order" style="width:100px">
                    <select v-model="type3">
                      <option value="0">전체</option>
                      <option value="1">일반</option>
                      <option value="2">이미지</option>
                      <option value="3">추천</option>
                      <option value="4">베스트</option>
                      <option value="5">이벤트</option>
                      <option value="6">공지</option>
                    </select>
                  </div>
                </div>
                <div class="search-col">
                  <span class="spst">키워드</span>
                  <input type="text" class="input" style="width: 320px" placeholder="제목이나 작성자 키워드를 입력하세요." v-model="keyword" @keyup.enter="firstSubmit"/>
                </div>
                <button type="button" class="btn" @click="firstSubmit">검색</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sectionBottom">
        <div class="inner">
          <div class="btnBox">
            <div class="btnLeft">
              <div class="total">
                <p>총 <span>{{totalElements}}</span> 건</p>
              </div>
              <div class="viewlistselect">
                <select v-model="pageNum">
                    <option value="10">10개</option>
                    <option value="50">50개</option>
                    <option value="100">100개</option>
                    <option value="300">300개</option>
                    <option value="500">500개</option>
                </select>
              </div>
            </div>
            <div class="btnRigth">
              <button type="button" class="btn camp" @click="enroll">
               포지션 게시판 공지/이벤트 글 등록
              </button>
            </div>
          </div>
          <div class="tableBox">
            <table class="table">
              <thead>
              <tr>
                <th>번호</th>
                <th>상태</th>
                <th>키</th>
                <th>라인</th>
                <th>글타입</th>
                <th>작성타입</th>
                <th>제목</th>
                <th>작성자(아이피)</th>
                <th>내용</th>
                <th>댓글수</th>
                <th>추천수</th>
                <th>조회수</th>
                <th>신고수</th>
                <th>메인등록</th>
                <th>등록일</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(item, index) in list">
                <tr class="line_hl" :key="index">
                  <td>
                    {{index + (page * pageNum) + 1}}
                  </td>
                  <td :class="{'red' : item.status != 1}">
                    <p @click="move(item)">{{item.status == 1 ? '정상' : item.status == 2 ? '삭제' : '정지'}}</p>
                  </td>
                  <td>
                    <p style="color:#6abe00">{{item.boardId}}</p>
                  </td>
                  <td>
                    <p>{{getLine(item.lineType)}}</p>
                  </td>
                  <td>
                    <p>{{getPost(item.postType)}}</p>
                  </td>
                  <td>
                    <p>{{getWriter(item.writerType)}}</p>
                  </td>
                  <td>
                    <p>{{truncateText(item.title)}}</p>
                  </td>
                  <td>
                    <p>{{item.writer}}({{item.ip}})</p>
                  </td>
                  <td>
                    <p>{{truncateText(item.content)}}</p>
                  </td>
                  <td>
                    <p>{{item.commentCount}}</p>
                  </td>
                  <td>
                    <p>{{item.recommendCount}}</p>
                  </td>
                  <td>
                    <p>{{item.view}}</p>
                  </td>
                  <td>
                    <p>{{item.report}}</p>
                  </td>
                  <td>
                    <template v-if="item.isMain == 1">
                      <button type="button" class="end" style="cursor: pointer" @click="enrollMain(item.boardId, 1, index)">해제</button>
                    </template>
                    <template v-else>
                      <button type="button" class="conf" style="cursor: pointer" @click="enrollMain(item.boardId, 0, index)">등록</button>
                    </template>
                  </td>
                  <td>
                    <p>{{item.writeDt}}</p>
                  </td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <paging-list :page.sync="page" :total-page="totalPage" :page-num="pageNum" @movePage="movePage"/>
    </div>
  </div>
</template>

<script>
import commonHelpler from "@/store/modules/common/helper";
import {mapGetters} from "vuex";
import cookies from "vue-cookies";
import cookieCont from "@/constants/cookieCont";
import service from "@/http/service";
import PagingList from "@/components/common/PagingList";
import FindBoardListRequest from "@/dto/board/FindBoardListRequest";
import UpdateBoardMainRequest from "@/dto/board/UpdateBoardMainRequest";

export default {
  name: "BoardPage",
  components: {PagingList},
  data() {
    return {
      keyword:  this.$route.query.keyword || '',
      type: this.$route.query.type || 9,
      type2: this.$route.query.type2 || 1,
      page: this.$route.query.page || 0,
      pageNum: this.$route.query.pageNum || 10,
      type3: this.$route.query.type3 || 0,
      list: [],
      totalElements: 0,
      totalPage: 0
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
      this.search()
  },
  methods: {
    firstSubmit() {
      this.page = 0
      this.submit()
    },
    search() {
      const param = new FindBoardListRequest(this.page, this.pageNum, this.keyword, this.type, this.type2, this.type3)
      service.findBoards(param).then(res => {
        if (res.data.resultCode == "00000") {
          this.list = res.data.list
          this.totalElements = res.data.totalElements
          this.totalPage = res.data.totalPage
        } else {
          alert('조회 실패')
        }
      }).catch(() => { alert('조회 실패') })
    },
    submit() {
      window.location.href = `/lawgg-ad/position?page=${this.page}&pageNum=${this.pageNum}&keyword=${this.keyword}&type=${this.type}&type2=${this.type2}&type3=${this.type3}`
    },
    movePage(page) {
      this.page = page;
      this.submit()
    },
    enroll() {
      this.$router.push('/position/notice')
    },
    move(item) {
      this.$router.push({
        path: '/position/detail',
        query: {
          id: item.boardId
        }
      })
    },
    truncateText(text) {
      if (!text) return ""
      if (text.length > 15) {
        return text.slice(0, 15) + '...';
      }
      return text;
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
    enrollMain(id, type, index) {
      const param = new UpdateBoardMainRequest(id, type)
      service.updateBoardMain(param)
          .then(res => {
            if (res.data.resultCode == '00000') {
              if (type == 0) {
                this.list[index].isMain = 1
                alert('등록성공')
              } else if (type == 1) {
                this.list[index].isMain = 0
                alert('해제성공')
              }
            } else {
              alert('실패')
            }
          }).catch(() => alert('실패'))
    }
  }
}
</script>

<style scoped>
.red {
  color: red;
}
</style>
