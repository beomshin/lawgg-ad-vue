<template>
  <div class="detail_container">

    <div class="detail_tb">
      <div class="tb_info">
        <h3>로펌 가입자 리스트</h3>
      </div>
      <div class="sectionBottom">
        <div class="inner">
          <div class="btnBox">
            <div class="btnLeft">
              <div class="total">
                <p>총 <span>{{totalElements1}}</span> 건</p>
              </div>
            </div>
          </div>
          <div class="tableBox">
            <table class="table">
              <thead>
              <tr>
                <th>번호</th>
                <th>아이디</th>
                <th>티어</th>
                <th>닉네임</th>
                <th>이름</th>
                <th>가입출처</th>
                <th>탈퇴여부</th>
                <th>재판가능여부</th>
                <th>계정상태</th>
                <th>가입일</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(item, index) in list">
                <tr class="line_hl" :key="index">
                  <td>
                    {{index + (page1 * pageNum1) + 1}}
                  </td>
                  <td>
                    <p>{{item.loginId}}</p>
                  </td>
                  <td>
                    <p>{{item.tier}}</p>
                  </td>
                  <td>
                    <p>{{item.nickName}}</p>
                  </td>
                  <td>
                    <p>{{item.name}}</p>
                  </td>
                  <td>
                    <p>{{snsTypeTitle(item.snsType)}}</p>
                  </td>
                  <td>
                    <p>{{item.delFlag == 0 ? 'N' : 'Y'}}</p>
                  </td>
                  <td>
                    <p>{{item.judgeFlag == 0 ? 'N' : 'Y'}}</p>
                  </td>
                  <td>
                    <p>{{statusTitle(item.status)}}</p>
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
      <paging-list :page.sync="page1" :total-page="totalPage1" :page-num="pageNum1" @movePage="movePage"/>
    </div>

    <hr>

    <div class="detail_tb">
      <div class="tb_info">
        <h3>로펌 가입 신청 리스트</h3>
      </div>
      <div class="sectionBottom">
        <div class="inner">
          <div class="btnBox">
            <div class="btnLeft">
              <div class="total">
                <p>총 <span>{{totalElements2}}</span> 건</p>
              </div>
            </div>
          </div>
          <div class="tableBox">
            <table class="table">
              <thead>
              <tr>
                <th>번호</th>
                <th>닉네임</th>
                <th>제목</th>
                <th>소개글</th>
                <th>요청일</th>
                <th>처리</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(item, index) in list2">
                <tr class="line_hl" :key="index">
                  <td>
                    {{index + (page2 * pageNum2) + 1}}
                  </td>
                  <td>
                    <p>{{item.name}}</p>
                  </td>
                  <td>
                    <p>{{item.title}}</p>
                  </td>
                  <td>
                    <p>{{item.introduction}}</p>
                  </td>
                  <td>
                    <p>{{item.regDt}}</p>
                  </td>
                  <td>
                    <button type="button" class="conf" style="cursor: pointer; margin-right: 5px" @click="accept(item.id,1)">수락</button>
                    <button type="button" class="end" style="cursor: pointer"  @click="accept(item.id,2)">거절</button>
                  </td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <paging-list :page.sync="page2" :total-page="totalPage2" :page-num="pageNum2" @movePage="movePage2"/>
    </div>

    <hr>

    <div class="bottom_btn">
      <button type="button" class="btn cancle" @click="back">뒤로가기</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import commonHelpler from "@/store/modules/common/helper";
import cookies from "vue-cookies";
import cookieCont from "@/constants/cookieCont";
import service from "@/http/service";
import FindLawFirmUsersRequest from "@/dto/lawFirm/FindLawFirmUsersRequest";
import PagingList from "@/components/common/PagingList";
import ConfirmLawFirmRequestDto from "@/dto/lawFirm/ConfirmLawFirmRequestDto";

export default {
  name: "LawFirmEnrollPage",
  components: {PagingList},
  data () {
    return {
      id: 0,
      page1:0,
      pageNum1: 10,
      totalElements1: 0,
      totalPage1: 0,
      page2:0,
      pageNum2: 10,
      totalElements2: 0,
      totalPage2: 0,
      list: [],
      list2: []
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
    this.id = this.$route.query.id
    this.search1()
    this.search2()
  },
  methods: {
    back() {
      window.history.back()
    },
    search1() {
      const param = new FindLawFirmUsersRequest(this.page1, this.pageNum1, this.id)
      service.findLawFirmUsers(param).then(res => {
        this.list = res.data.list
        this.totalElements1 = res.data.totalElements
        this.totalPage1 = res.data.totalPage
      })
    },
    search2() {
      const param = new FindLawFirmUsersRequest(this.page2, this.pageNum2, this.id)
      service.findLawFirmApplyUsers(param).then(res => {
        this.list2 = res.data.list
        this.totalElements2 = res.data.totalElements
        this.totalPage2 = res.data.totalPage
      })
    },
    statusTitle(status) {
      switch (status) {
        case 1 : return '정상'
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
    accept(id, flag) {
      const param = new ConfirmLawFirmRequestDto(id, flag)
      service.acceptLawFirm(param).then(res => {
        if (res.data.resultCode == '00000') {
          window.location.reload()
          alert('성공')
        } else {
          window.location.reload()
        }
      })
    },
    movePage(page) {
      this.page1 = page;
      this.search1()
    },
    movePage2(page) {
      this.page2 = page;
      this.search2()
    },
  },
}
</script>

<style scoped>
  .inner {
    width: 100%;
    margin: auto;
  }
</style>
