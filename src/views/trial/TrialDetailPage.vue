<template>
  <div class="detail_container">
    <div class="detail_tb">
      <div class="tb_info">
        <h3>기본정보</h3>
      </div>
      <table class="table hz">
        <tbody class="tb1">
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
        <tr>
          <th>상태</th>
          <td>
            <div style="display: flex">
              <div style="margin-right: 10px">
                <input type="radio" id="taxY2" name="taxY2" value="1" v-model="status">
                <label for="taxY2">정상</label>
              </div>
              <div>
                <input type="radio" id="taxN2" name="taxN2" value="2" v-model="status">
                <label for="taxN2">삭제</label>
              </div>
              <div>
                <input type="radio" id="taxN3" name="taxN3" value="9"  v-model="status">
                <label for="taxN3">정지</label>
              </div>
            </div>
          </td>
          <th>핫트라이얼 게시여부</th>
          <td >
            <div style="margin-right: 10px">
                <input type="radio" id="hot1" name="hot1" value="0" v-model="mainPostType">
                <label for="hot1">미게시</label>
              </div>
              <div>
                <input type="radio" id="hot2" name="hot2" value="1" v-model="mainPostType">
                <label for="hot2">게시</label>
              </div>
          </td>
        </tr>
        <tr>
          <th>글타입</th>
          <td colspan="3">
            <div style="display: flex">
              <div style="margin-right: 10px">
                <input type="radio" id="p1" name="p1" value="0" v-model="postType">
                <label for="p1">일반</label>
              </div>
              <div>
                <input type="radio" id="p2" name="p2" value="1" v-model="postType">
                <label for="p2">이미지</label>
              </div>
              <div>
                <input type="radio" id="p3" name="p3" value="2" v-model="postType">
                <label for="p3">추천</label>
              </div>
              <div>
                <input type="radio" id="p4" name="p4" value="3" v-model="postType">
                <label for="p4">베스트</label>
              </div>
              <div>
                <input type="radio" id="p5" name="p5" value="98" v-model="postType">
                <label for="p5">이벤트</label>
              </div>
              <div>
                <input type="radio" id="p6" name="p6" value="99" v-model="postType">
                <label for="p6">공지</label>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>작성자</th>
          <td >
            {{this.trial.writer}}
          </td>
          <th>티어</th>
          <td >
            {{this.trial.tireName}}
          </td>
        </tr>
        <tr>
          <th>등록일</th>
          <td >
            {{this.trial.regDt}}
          </td>
          <th>게시글번호(Key)</th>
          <td >
            {{this.trial.trialId}}
          </td>
        </tr>
        <tr>
          <th>판사명</th>
          <td >
            {{this.trial.judgeName || '-'}}
          </td>
          <th>로펌명</th>
          <td >
            {{this.trial.lawFirmName || '-'}}
          </td>
        </tr>
        <tr>
          <th>라이브상태</th>
          <td >
            <div style="display: flex">
              <div style="margin-right: 10px">
                <input type="radio" id="l1" name="l1" value="0" :checked="liveType == 0" @click="change3(0)">
                <label for="l1">미방송</label>
              </div>
              <div>
                <input type="radio" id="l2" name="l2" value="1" :checked="liveType == 1" @click="change3(1)">
                <label for="l2">방송</label>
              </div>
            </div>
          </td>
          <th>종료상태</th>
          <td >
            <div style="display: flex">
              <div style="margin-right: 10px">
                <input type="radio" id="e1" name="e1" value="0" :checked="endingType == 0" @click="change4(0)">
                <label for="e1">미종료</label>
              </div>
              <div>
                <input type="radio" id="e2" name="e2" value="1" :checked="endingType == 1" @click="change4(1)">
                <label for="e2">종료</label>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>라이브시작일</th>
          <td >
            {{this.trial.liveDt || '-'}}
          </td>
          <th>종료일</th>
          <td >
            {{this.trial.endDt || '-'}}
          </td>
        </tr>
        <tr>
          <th>판례</th>
          <td >
            <div style="display: flex">
              <div style="margin-right: 10px">
                <input type="radio" id="pe1" name="pe1" value="9" :checked="precedent == 9" @click="change5(9)">
                <label for="pe1">진행중</label>
              </div>
              <div>
                <input type="radio" id="pe2" name="pe2" value="0" :checked="precedent == 0" @click="change5(0)">
                <label for="pe2">원고승</label>
              </div>
              <div>
                <input type="radio" id="pe3" name="pe3" value="1" :checked="precedent == 1" @click="change5(1)">
                <label for="pe3">피고승</label>
              </div>
            </div>
          </td>
          <th>로펌상태</th>
          <td >
            <div style="display: flex">
              <div style="margin-right: 10px">
                <input type="radio" id="lw1" name="lw1" value="0" :checked="lawFirmDefense == 0" @click="change6(0)">
                <label for="lw1">일반상태</label>
              </div>
              <div>
                <input type="radio" id="lw2" name="lw2" value="1" :checked="lawFirmDefense == 1" @click="change6(1)">
                <label for="lw2">승소</label>
              </div>
              <div>
                <input type="radio" id="lw3" name="lw3" value="2" :checked="lawFirmDefense == 2" @click="change6(2)">
                <label for="lw3">패소</label>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>댓글수</th>
          <td >
            {{this.trial.commentCount}}
          </td>
          <th>추천수</th>
          <td >
            {{this.trial.recommendCount}}
          </td>
        </tr>
        <tr>
          <th>조회수</th>
          <td >
            {{this.trial.view}}
          </td>
          <th>신고수</th>
          <td >
            {{this.trial.report}}
          </td>
        </tr>

        <tr>
          <th>리플레이파일</th>
          <td colspan="3">
            <a v-if="this.trial.replay" :href="this.trial.replay" download="리플레이">리플레이파일 다운</a>
          </td>
        </tr>
        
        <tr>
          <th>원고</th>
          <td >
            {{this.trial.plaintiff}}
          </td>
          <th>피고</th>
          <td >
            {{this.trial.defendant}}
          </td>
        </tr>
        <tr>
          <th>원고의견</th>
          <td colspan="3">
            <input class="input dinput" style="width: 80%" type="text"  v-model="this.trial.plaintiffOpinion" disabled/>
          </td>
        </tr>
        <tr>
          <th>피고의견</th>
          <td colspan="3">
            <input class="input dinput" style="width: 80%" type="text"  v-model="this.trial.defendantOpinion" disabled/>
          </td>
        </tr>
        <tr>
          <th>라이브 URL</th>
          <td colspan="3">
            <input class="input dinput" style="width: 80%" type="text"  v-model="this.trial.url" disabled/>
          </td>
        </tr>
        <tr>
          <th>핫게시물 대체 영상 URL</th>
          <td colspan="3">
            <input class="input dinput" style="width: 80%" type="text" v-model="altVideoUrl"/>
            <button class="deleteInp" @click="altVideoUrl=''">삭제</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="detail_tb">
      <div class="tb_info">
        <h3>영상</h3>
      </div>
      <table class="table">
        <tbody class="tb1">
          <tr >
            <td colspan="3">
              <iframe width="100%" height="640" :src="this.trial.playVideo" title="트라이얼 영상" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </td>
            <td style="border-left:none"></td>
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
import FindTrialDetailRequest from "@/dto/trial/findTrialDetailRequest";
import UpdateTrialStatusRequest from "@/dto/trial/UpdateTrialStatusRequest";


export default {
  name: "TrialDetailPage",
  data () {
    return {
      board: {},
      status: 0,
      postType: 0,
      mainPostType: 0,
      files: [],
      trial: {},
      liveType: 0,
      endingType: 0,
      precedent: 0,
      lawFirmDefense: 0,
      title: '',
      content: '',
      altVideoUrl:''
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
    change3(type) {
      this.liveType = type
    },
    change4(type) {
      this.endingType = type
    },
    change5(type) {
      this.precedent = type
    },
    change6(type) {
      this.lawFirmDefense = type
    },
    change7(type) {
      this.mainPostType = type
    },
    changeAltVideoUrl(e) {
      this.trial.altVideoUrl = e.target.value
    },
    find(id) {
      const param = new FindTrialDetailRequest(id);
      service.findTrialDetail(param).then(res => {
        console.log(res);
        if (res.data.resultCode == '00000') {
          this.trial = res.data.trial
          this.status = this.trial.status
          this.postType = this.trial.postType
          this.mainPostType = this.trial.mainPostType
          this.liveType = this.trial.liveType
          this.endingType = this.trial.endingType
          this.precedent = this.trial.precedent
          this.lawFirmDefense = this.trial.lawFirmDefense
          this.files = res.data.files
          this.title = this.trial.title;
          this.content = this.trial.content
          this.altVideoUrl = this.trial.altVideoUrl
        } else {
          alert('조회실패')
        }
      }).catch(() => alert('조회실패'))
    },
    update() {
      const param = new UpdateTrialStatusRequest( this.trial.trialId, this.status, this.postType,this.mainPostType, this.liveType, this.endingType, this.precedent, this.lawFirmDefense, this.title, this.content, this.altVideoUrl)
      service.updateTrialStatus(param).then(res => {
        if (res.data.resultCode == '00000') {
          alert('수정성공!')
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
