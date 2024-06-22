<template>
  <div class="wrap">
    <div class="content">
      <div class="inner">
        <h2>트라이얼 리스트</h2>
      </div>
      <div class="sectionTop">
        <div class="inner">
          <div>
            <div>
              <div class="searchBox">
                <div class="search-col">
                  <span class="spst">라이브상태</span>
                  <div class="order" style="width:100px">
                    <select v-model="type">
                      <option value="0">전체</option>
                      <option value="1">미방송</option>
                      <option value="2">방송</option>
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
                  <span class="spst">종료상태</span>
                  <div class="order" style="width:100px">
                    <select v-model="type3">
                      <option value="0">전체</option>
                      <option value="1">미종료</option>
                      <option value="2">종료</option>
                    </select>
                  </div>
                </div>
                <div class="search-col">
                  <span class="spst">글상태</span>
                  <div class="order" style="width:100px">
                    <select v-model="type4">
                      <option value="0">전체</option>
                      <option value="1">정상</option>
                      <option value="2">삭제</option>
                      <option value="3">정지</option>
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
                트라이얼 공지/이벤트 글 등록
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
                <th>글타입</th>
                <th>라이브상태</th>
                <th>종료상태</th>
                <th>판례</th>
                <th>로펌</th>
                <th>제목</th>
                <th>작성자</th>
                <th>내용</th>
                <th>댓글수</th>
                <th>추천수</th>
                <th>조회수</th>
                <th>신고수</th>
                <th>메인등록</th>
                <th>핫트라이얼</th>
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
                    <p style="color:#6abe00">{{item.trialId}}</p>
                  </td>
                  <td>
                    <p>{{getPost(item.postType)}}</p>
                  </td>
                  <td :class="{'blue' : item.liveType == 1}">
                    <p>{{getLive(item.liveType)}}</p>
                  </td>
                  <td :class="{'orange' : item.endingType == 1}">
                    <p>{{getEnd(item.endingType)}}</p>
                  </td>
                  <td>
                    <p>{{getPrecedent(item.precedent)}}</p>
                  </td>
                  <td>
                    <p>{{getLawFirmDefense(item.lawFirmDefense)}}</p>
                  </td>
                  <td>
                    <p>{{truncateText(item.title)}}</p>
                  </td>
                  <td>
                    <p>{{item.writer}}</p>
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
                      <button type="button" class="end" style="cursor: pointer" @click="enrollMain(item.trialId, 1, index)">해제</button>
                    </template>
                    <template v-else>
                      <button type="button" class="conf" style="cursor: pointer" @click="enrollMain(item.trialId, 0, index)">등록</button>
                    </template>
                  </td>
                  <td>
                    <template v-if="item.mainPostType == 0">
                      <button type="button" class="conf" style="cursor: pointer" @click="setHotTrial(item.trialId, 1, index)">등록</button>
                    </template>
                    <template v-else>
                      <button type="button" class="end" style="cursor: pointer" @click="setHotTrial(item.trialId, 0, index)">Hot</button>
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
import FindTrialListRequest from "@/dto/trial/FindTrialListRequest";
import UpdateTrialMainRequest from "@/dto/trial/UpdateTrialMainRequest";

export default {
  name: "TrialPage",
  components: {PagingList},
  data() {
    return {
      keyword:  this.$route.query.keyword || '',
      type: this.$route.query.type || 0,
      type2: this.$route.query.type2 || 1,
      page: this.$route.query.page || 0,
      pageNum: this.$route.query.pageNum || 10,
      type3: this.$route.query.type3 || 0,
      type4: this.$route.query.type4 || 0,
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
      const param = new FindTrialListRequest(this.page, this.pageNum, this.keyword, this.type2, this.type, this.type3, this.type4,this.type5)
      service.findTrial(param).then(res => {
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
      window.location.href = `/lawgg-ad/trial?page=${this.page}&pageNum=${this.pageNum}&keyword=${this.keyword}&type=${this.type}&type2=${this.type2}&type3=${this.type3}&type4=${this.type4}&type5=${this.type5}`
    },
    movePage(page) {
      this.page = page;
      this.submit()
    },
    move(item) {
      this.$router.push({
        path: '/trial/detail',
        query: {
          id: item.trialId
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
    getLive(type) {
      switch (type) {
        case 0: return "미방송";
        case 1 : return "방송";
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
    getEnd(type) {
      switch (type) {
        case 0: return "미종료";
        case 1 : return "종료";
      }
    },
    getPrecedent(type) {
      switch (type) {
        case 0: return "원고승";
        case 1 : return "피고승";
        case 9 : return "진행중"
      }
    },
    getLawFirmDefense(type) {
      switch (type) {
        case 0: return "일반상태";
        case 1 : return "승소";
        case 9 : return "패소"
        default: return "일반상태"
      }
    },
    getHotTrial(type) {
      switch (type) {
        case 0: return "등록";
        case 1 : return "해제";
      }
    },
    enrollMain(id, type, index) {
      const param = new UpdateTrialMainRequest(id, type)
      service.enrollTrialMain(param)
          .then(res => {
            console.log(res);
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
            this.search()
          }).catch(() => alert('실패'))
    },
    setHotTrial(id, type, index) {
      const param = new UpdateTrialMainRequest(id, type)
      service.setHotTrial(param)
          .then(res => {
            if (res.data.resultCode == '00000') {
              if (type == 0) {
                // this.list[index].mainPostType = 1
                // alert('해제성공')
              } else if (type == 1) {
                this.list[index].mainPostType = 0
                alert('등록성공')
              }
              this.search()
            } else {
              alert('실패')
            }
          }).catch(() => alert('실패'))
    },
    enroll() {
      this.$router.push('/trial/notice')
    }
  }
}
</script>

<style scoped>
  .red {
    color: red;
  }
  .blue {
    color: blue;
  }
  .orange {
    color: #ff9d00;
  }
</style>
