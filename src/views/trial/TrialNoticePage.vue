<template>
  <div class="detail_container">
    <div class="detail_tb">
      <div class="tb_info">
        <h3>공지/이벤트 등록하기</h3>
      </div>
      <table class="table hz">
        <tbody class="tb1">
        <tr>
          <th>글타입</th>
          <td colspan="3">
            <div style="display: flex">
              <div style="margin-right: 10px">
                <input type="radio" id="taxY2" name="taxY2" value="0" :checked="type == 98" @click="change(98)">
                <label for="taxY2">이벤트</label>
              </div>
              <div>
                <input type="radio" id="taxN2" name="taxN2" value="1" :checked="type == 99" @click="change(99)">
                <label for="taxN2">공지</label>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>작성자</th>
          <td colspan="3">
            <input class="input dinput" style="width: 80%" type="text" placeholder="로펌 이름을 입력해주세요." v-model="writer" />
          </td>
        </tr>
        <tr>
          <th>제목</th>
          <td colspan="3">
            <input class="input dinput" style="width: 80%" type="text" placeholder="로펌 이름을 입력해주세요." v-model="title" />
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td colspan="3">
              <textarea
                  class="input memo"
                  placeholder="내용을 입력해주세요."
                  v-model="content"
              ></textarea>
          </td>
        </tr>
        <tr>
          <th>이미지 등록</th>
          <td colspan="3">
            <label>
              <input type="file" id="file" ref="file"  @change="handleFileChange">
            </label>
            <input type="text" readonly="readonly" title="File Route" id="fileRoute" placeholder="파일 업로드" class="input-box w100p"/>
          </td>
        </tr>
        <template v-for="(item, index) in files" v-if="files.length > 0">
          <tr :key="index">
            <th>등록 이미지</th>
            <td colspan="3">
              <div class="flexOption">
                <p>{{item.name}}</p>
                <button class="btn" style="cursor: pointer " @click="deleteFile(index)">제거</button>
              </div>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>

    <div class="bottom_btn">
      <button type="button" class="btn cancle" @click="back">뒤로가기</button>
      <button type="button" class="btn update" @click="enroll">등록</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import commonHelpler from "@/store/modules/common/helper";
import cookies from "vue-cookies";
import cookieCont from "@/constants/cookieCont";
import service from "@/http/service";
import EnrollTrialNoticeRequest from "@/dto/trial/EnrollTrialNoticeRequest";

const MAX_SIZE = 3 * 1024 * 1024 // 최대 파일 크기 3MB

export default {
  name: "BoardNoticePage",
  data () {
    return {
      type: 98,
      title: '',
      writer: '',
      content: '',
      files: []
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
  },
  methods: {
    back() {
      window.history.back()
    },
    handleFileChange(e) { // 파일 등록
      let file = e.target.files[0]
      if (!file) return;
      this.filePath1 = e.target.value
      e.target.value = ''; // 동일한 파일 업로드를 위해 초기화
      const ext = this.getExt(file.name)
      if (file.size > MAX_SIZE) { // 사이즈 검사
        alert('파일 크기가 3MB를 초과했습니다.')
        return
      } else if (!ext) return; // 확장자 검사
      file.ext = ext
      this.files.push(file)
    },
    change(type) {
      this.type = type
    },
    getExt(fileName) {
      const arr = ['hwp', 'jpg', 'png', 'xls', 'jpeg', 'rofl'];
      const ext =  fileName.split('.').pop().toLowerCase();
      if(!arr.includes(ext)) {
        alert(ext + '파일은 업로드 하실 수 없습니다.');
        return null
      }
      return ext
    },
    deleteFile(index) {
      this.files = this.files.filter((e, i) => i != index)
    },
    enroll() {
      if (!this.title || !this.writer || !this.content) {
        alert('내용을 제대로 입력해주세요.')
        return
      }
      const param = new EnrollTrialNoticeRequest(this.writer, this.title, this.content, this.files, this.type)
      service.enrollTrialNotice(param).then(res => {
        if (res.data.resultCode == '00000') {
          alert('등록성공')
          window.history.back()
        } else {
          alert('등록실패')
        }
      }).catch(() => alert('등록실패'))
    }
  },
}
</script>

<style scoped>

</style>
