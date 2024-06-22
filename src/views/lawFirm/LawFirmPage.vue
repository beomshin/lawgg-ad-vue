<template>
  <div class="wrap">
    <div class="content">
      <div class="inner">
        <h2>로펌 리스트</h2>
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
                      <option value="1">활성</option>
                      <option value="2">비활성</option>
                      <option value="3">삭제</option>
                    </select>
                  </div>
                </div>
                <div class="search-col">
                  <span class="spst">키워드</span>
                  <input type="text" class="input" style="width: 320px" placeholder="로펌 이름이나 대표판사 닉네임을 입력해주세요." v-model="keyword" @keyup.enter="firstSubmit"/>
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
            <div class="btnRigth">
              <button type="button" class="btn camp" @click="enroll">
                로펌등록
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
                <th>로펌이름</th>
                <th>로펌장</th>
                <th>구독자</th>
                <th>메모</th>
                <th>등록일</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(item, index) in list">
                <tr class="line_hl" :key="index">
                  <td>
                    {{index + (page * pageNum) + 1}}
                  </td>
                  <td>
                    <p @click="move(item)">{{item.status == 1 ? '활성' : item.status == 2 ? '삭제' : '비활성'}}</p>
                  </td>
                  <td>
                    <p style="color:#6abe00">{{item.lawFirmId}}</p>
                  </td>
                  <td>
                    <p>{{item.name}}</p>
                  </td>
                  <td>
                    <p>{{item.repName}}</p>
                  </td>
                  <td>
                    <p @click="move2(item)">{{item.userCnt}}</p>
                  </td>
                  <td>
                    <p>{{truncateText(item.memo)}}</p>
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
import {mapGetters} from "vuex";
import cookies from "vue-cookies";
import cookieCont from "@/constants/cookieCont";
import FindLawFirmListRequest from "@/dto/lawFirm/FindLawFirmListRequest";
import service from "@/http/service";
import PagingList from "@/components/common/PagingList";

export default {
  name: "LawFirmPage",
  components: {PagingList},
  data() {
    return {
      keyword:  this.$route.query.keyword || '',
      type: this.$route.query.type || 0,
      page: this.$route.query.page || 0,
      pageNum: this.$route.query.pageNum || 10,
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
      this.page = 0;
      this.submit()
    },
    search() {
      const param = new FindLawFirmListRequest(this.page, this.pageNum, this.keyword, this.type)
      service.findLawFirm(param).then(res => {
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
      window.location.href = `/lawgg-ad/lawfirm?page=${this.page}&pageNum=${this.pageNum}&keyword=${this.keyword}&type=${this.type}`
    },
    movePage(page) {
      this.page = page;
      this.submit()
    },
    enroll() {
      this.$router.push('/lawfirm/enroll')
    },
    move(item) {
      this.$router.push({
        path: '/lawfirm/update',
        query: {
          id: item.lawFirmId
        }
      })
    },
    move2(item) {
      this.$router.push({
        path: '/lawfirm/update2',
        query: {
          id: item.lawFirmId
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
  }
}
</script>

<style scoped>
.table tbody tr td:nth-child(6) p{text-decoration: underline; text-underline-position: under; cursor: pointer; }
.table tbody tr td:nth-child(6) p:hover{color: #ff9582}
</style>
