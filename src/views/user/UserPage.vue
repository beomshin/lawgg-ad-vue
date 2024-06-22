<template>
  <div class="wrap">
    <div class="content">
      <div class="inner">
        <h2>회원 리스트</h2>
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
                      <option value="0">전체</option>
                      <option value="1">정상</option>
                      <option value="2">정지</option>
                      <option value="3">삭제</option>
                    </select>
                  </div>
                </div>
                <div class="search-col">
                  <span class="spst">가입경로</span>
                  <div class="order" style="width:100px">
                    <select v-model="type2">
                      <option value="0">전체</option>
                      <option value="1">로우지지</option>
                      <option value="2">카카오</option>
                      <option value="3">네이버</option>
                      <option value="4">구글</option>
                    </select>
                  </div>
                </div>
                <div class="search-col">
                  <span class="spst">정렬</span>
                  <div class="order" style="width:150px">
                    <select v-model="type3">
                      <option value="0">최근가입일</option>
                      <option value="1">게시판작성수</option>
                      <option value="2">트라이얼작성수</option>
                      <option value="3">댓글작성수</option>
                    </select>
                  </div>
                </div>
                <div class="search-col">
                  <span class="spst">키워드</span>
                  <input type="text" class="input" style="width: 320px" placeholder="로그인아이이 또는 닉네임을 입력해주세요." v-model="keyword" @keyup.enter="firstSubmit"/>
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
                    <option value="30">30개</option>
                    <option value="50">50개</option>
                </select>
              </div>
            </div>
          </div>
          <div class="tableBox">
            <table class="table">
              <thead>
              <tr>
                <th>번호</th>
                <th>아이디</th>
                <th>이름</th>
                <th>닉네임</th>
                <th>티어</th>
                <th>가입경로</th>
                <th>게시판작성수</th>
                <th>트라이얼작성수</th>
                <th>댓글작성수</th>
                <th>개인정보보호기간</th>
                <th>삭제상태</th>
                <th>재판가능여부</th>
                <th>본인인증여부</th>
                <th>계정상태</th>
                <th>상태변경</th>
                <th>가입일</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(item, index) in list">
                <tr class="line_hl" :key="index">
                  <td>
                    {{index + (page * pageNum) + 1}}
                  </td>
                  <td>
                    <p @click="moveDetail(item)">{{item.loginId}}</p>
                  </td>
                  <td>
                    <p>{{item.name}}</p>
                  </td>
                  <td>
                    <p >{{item.nickName}}</p>
                  </td>
                  <td>
                    <p>{{item.tier}}</p>
                  </td>
                  <td>
                    <p>{{snsTypeTitle(item.snsType)}}</p>
                  </td>
                  <td>
                    <p>{{item.boardCount}}</p>
                  </td>
                  <td>
                    <p>{{item.trialCount}}</p>
                  </td>
                  <td>
                    <p>{{item.commentCount}}</p>
                  </td>
                  <td>
                    <p>{{item.personalPeriod == 99 ? '탈퇴시' : item.personalPeriod == 0 ? 'SNS' : item.personalPeriod + '년'}}</p>
                  </td>
                  <td>
                    <p>{{item.delFlag == 0 ? 'N' : 'Y'}}</p>
                  </td>
                  <td>
                    <p>
                      <template v-if="item.judgeFlag == 0">
                        <button type="button" class="conf" style="cursor: pointer" @click="enrollJudge(item.userId, 1, index)">판사등록</button>
                      </template>
                      <template v-else>
                        <button type="button" class="end" style="cursor: pointer" @click="enrollJudge(item.userId, 0, index)">판사해제</button>
                      </template>
                    </p>
                  </td>
                  <td>
                    <p>{{item.authFlag == 0 ? 'N' : 'Y'}}</p>
                  </td>
                  <td>
                    <p>{{statusTitle(item.status)}}</p>
                  </td>
                  <td>
                    <template v-if="item.status == 1">
                      <button type="button" class="end" style="cursor: pointer" @click="enrollStatus(item.userId, 0, index)">정지</button>
                    </template>
                    <template v-else-if="item.status == 2">
                      <button type="button" class="conf" style="cursor: pointer" @click="enrollStatus(item.userId, 1, index)">정지해제</button>
                    </template>
                    <template v-else-if="item.status == 9">
                      삭제상태
                    </template>
                  </td>
                  <td>
                    <p>{{item.regDt}}</p>
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
import {mapGetters, mapMutations} from "vuex";
import cookies from "vue-cookies";
import cookieCont from "@/constants/cookieCont";
import service from "@/http/service";
import PagingList from "@/components/common/PagingList";
import FindUsersRequest from "@/dto/user/FindUsersRequest";
import JudgeUserRequest from "@/dto/user/JudgeUserRequest";
import StatusUserRequest from "@/dto/user/StatusUserRequest";

export default {
  name: "UserPage",
  components: {PagingList},
  data() {
    return {
      keyword:  this.$route.query.keyword || '',
      type: this.$route.query.type || 0,
      page: this.$route.query.page || 0,
      pageNum: this.$route.query.pageNum || 10,
      type2: this.$route.query.type2 || 0,
      type3:this.$route.query.type3 || 0,
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
    ...mapMutations(commonHelpler.name, commonHelpler.mutations),
    firstSubmit() {
      this.page = 0;
      this.submit()
    },
    search() {
      const param = new FindUsersRequest(this.page, this.pageNum, this.keyword, this.type, this.type2, this.type3)
      service.findUsers(param).then(res => {
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
      window.location.href = `/lawgg-ad/user?page=${this.page}&pageNum=${this.pageNum}&keyword=${this.keyword}&type=${this.type}&type2=${this.type2}&type3=${this.type3}`
    },
    movePage(page) {
      this.page = page;
      this.submit()
    },
    truncateText(text) {
      if (!text) return ""
      if (text.length > 15) {
        return text.slice(0, 15) + '...';
      }
      return text;
    },
    statusTitle(status) {
      switch (status) {
        case 1 : return '정상'
        case 2: return '정지'
        case 9 : return '탈퇴'
        default: return '확인불가'
      }
    },
    snsTypeTitle(type) {
      switch (type) {
        case 0: return '로우지지'
        case 1: return '구글'
        case 2: return '네이버'
        case 3: return '카카오'
        default : return '확인불가'
      }
    },
    enrollJudge(id, type, index) {
      const param = new JudgeUserRequest(id, type);
      service.updateUserJudge(param).then(res => {
        if (res.data.resultCode == '00000') {

          if (type == 1) {
            alert('등록성공')
            this.list[index].judgeFlag = 1
          } else if (type == 0) {
            alert('해제성공')
            this.list[index].judgeFlag = 0
          }
        } else {
          alert('등록실패')
        }
      })
    },
    enrollStatus(id, type, index) {
      const param = new StatusUserRequest(id, type);
      service.updateUserStatus(param).then(res => {
        if (res.data.resultCode == '00000') {

          if (type == 0) {
            alert('정지성공')
            this.list[index].status = 2
          } else if (type == 1) {
            alert('해제성공')
            this.list[index].status = 1
          }
        } else {
          alert('등록실패')
        }
      })
    },
    moveDetail(item) {
      this.$router.push({
        path: '/user/detail',
        query: {
          id: item.userId
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
