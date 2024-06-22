<template>
  <div class="detail_container">
    <div class="detail_tb">
      <div class="tb_info">
        <h3>기본정보</h3>
      </div>
      <table class="table hz">
        <tbody class="tb1">
        <tr>
          <th>유저상태</th>
          <td colspan="3">
            <div style="display: flex">
              <div style="margin-right: 10px">
                <input type="radio" id="taxY2" name="taxY2" value="1" :checked="status == 1" @click="change(1)">
                <label for="taxY2">정상</label>
              </div>
              <div>
                <input type="radio" id="taxN2" name="taxN2" value="2" :checked="status == 2" @click="change(2)">
                <label for="taxN2">정지</label>
              </div>
              <div>
                <input type="radio" id="taxN3" name="taxN3" value="9" :checked="status == 9" @click="change(9)">
                <label for="taxN3">삭제</label>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>삭제 플래그</th>
          <td>
            <div style="display: flex">
              <div style="margin-right: 10px">
                <input type="radio" id="p1" name="p1" value="0" :checked="delFlag == 0" @click="change2(0)">
                <label for="p1">미삭제</label>
              </div>
              <div>
                <input type="radio" id="p2" name="p2" value="1" :checked="delFlag == 1" @click="change2(1)">
                <label for="p2">삭제</label>
              </div>
            </div>
          </td>
          <th>재판 가능 유저</th>
          <td >
            <div style="display: flex">
              <div style="margin-right: 10px">
                <input type="radio" id="l1" name="l1" value="0" :checked="judgeFlag == 0" @click="change3(0)">
                <label for="l1">불가능</label>
              </div>
              <div>
                <input type="radio" id="l2" name="l2" value="1" :checked="judgeFlag == 1" @click="change3(1)">
                <label for="l2">가능</label>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>인증상태</th>
          <td >
            <div style="display: flex">
              <div style="margin-right: 10px">
                <input type="radio" id="e1" name="e1" value="0" :checked="authFlag == 0" @click="change4(0)">
                <label for="e1">미인증</label>
              </div>
              <div>
                <input type="radio" id="e2" name="e2" value="1" :checked="authFlag == 1" @click="change4(1)">
                <label for="e2">인증</label>
              </div>
            </div>
          </td>
          <th>인증일</th>
          <td >
            {{this.user.authDt ? this.user.authDt : '-'}}
          </td>
        </tr>
        <tr>
          <th>이름</th>
          <td >
            {{this.user.name}}
          </td>
          <th>티어</th>
          <td >
            <template v-if="this.user && this.tiers">
              <select v-model="tierId">
                <template v-for="(item, index) in this.tiers">
                  <option :value="item.tierId" :key="index">{{ item.name }} / {{ item.level }}</option>
                </template>
              </select>
            </template>
          </td>
        </tr>
        <tr>
          <th>등록일</th>
          <td >
            {{this.user.regDt}}
          </td>
          <th>이메일</th>
          <td >
            {{this.user.email ? this.user.email : '-'}}
          </td>
        </tr>
        <tr>
          <th>아이디</th>
          <td >
            {{this.user.loginId}}
          </td>
          <th>닉네임</th>
          <td >
            {{this.user.nickName}}
          </td>
        </tr>
        <tr>
          <th>생일</th>
          <td >
            {{this.user.birth ? this.user.birth : '-'}}
          </td>
          <th>성별</th>
          <td >
            {{this.user.gender ? this.user.gender == 'male' ? '남성' : '여성' : '-'}}
          </td>
        </tr>
        <tr>
          <th>sns타입</th>
          <td >
            {{this.snsTypeTitle(this.user.snsType)}}
          </td>
          <th>개인정보유효기간</th>
          <td >
            {{this.user.personalPeriod == 0 ? 'sns' : this.user.personalPeriod == 99 ? '탈퇴시' : this.user.personalPeriod + '년'}}
          </td>
        </tr>
        <tr>
          <th>로펌명</th>
          <td >
            {{this.user.lawFirmName ? this.user.lawFirmName : '-'}}
          </td>
          <th>로펌가입일</th>
          <td >
            {{this.user.lawFirmEnrollDt ? this.user.lawFirmEnrollDt : '-'}}
          </td>
        </tr>
        <tr>
          <th>게시판작성수</th>
          <td >
            {{this.user.boardCount}}
          </td>
          <th>트라이얼작성수</th>
          <td >
            {{this.user.trialCount}}
          </td>
        </tr>
        <tr>
          <th>포인트</th>
          <td style="color: red">
            {{this.user.point}}
          </td>
          <th>댓글작성수</th>
          <td >
            {{this.user.commentCount}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>


    <div class="detail_tb">
      <div class="tb_info">
        <h3>프로필</h3>
      </div>
      <table class="table">
        <tbody class="tb1">
          <tr>
            <th>이미지</th>
            <td colspan="3">
              <img :src="this.user.profile" >
            </td>
            <td style="border-left:none"></td>
          </tr>
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
import UpdateTrialStatusRequest from "@/dto/trial/UpdateTrialStatusRequest";
import UpdateUser from "@/dto/user/UpdateUser";


export default {
  name: "TrialDetailPage",
  data () {
    return {
      tiers: [],
      board: {},
      status: 0,
      delFlag: 0,
      files: [],
      user: {},
      trial: {},
      judgeFlag: 0,
      authFlag: 0,
      precedent: 0,
      lawFirmDefense: 0,
      title: '',
      content: '',
      tierId: 0
    }
  },
  computed: {
    ...mapGetters(commonHelpler.name, commonHelpler.getters),
    isLogin () {
      return cookies.isKey(cookieCont.AUTH_COOKIE_NAME)
    }
  },
  mounted() {
    if (!this.isLogin) {
      window.location.replace('/lawgg-ad')
    }
    const id = this.$route.query.id
    this.setTier()
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
      this.delFlag = type
    },
    change3(type) {
      this.judgeFlag = type
    },
    change4(type) {
      this.authFlag = type
    },
    find(id) {
      service.findUserDetail({ id }).then(res => {
        if (res.data.resultCode == '00000') {
          this.user = res.data.userTb
          this.status = this.user.status
          this.delFlag = this.user.delFlag
          this.judgeFlag = this.user.judgeFlag
          this.authFlag = this.user.authFlag
          this.tierId = this.user.tierId
        } else {
          alert('조회실패')
        }
      }).catch(() => alert('조회실패'))
    },
    update() {
      const param = new UpdateUser(this.user.userId, this.status, this.delFlag, this.judgeFlag, this.authFlag, this.tierId)
      service.updateUser(param).then(res => {
        if (res.data.resultCode == '00000') {
          alert('수정성공')
          window.history.back()
        } else {
          alert('수정실패')
        }
      }).catch(() => alert('수정실패'))
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
    setTier() {
      if(!this.getTiers) {
        service.findTiers()
            .then(res => {
              this.tiers = res.data.tiers
            })
            .catch(err => {
              console.log(err)
            })
      }
    },
    selected(tierId) {
      return tierId == this.user.tierId
    }
  },
}
</script>

<style scoped>

</style>
