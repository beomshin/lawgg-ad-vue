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
                <input type="radio" id="taxY2" name="taxY2" value="0" :checked="status == 1" @click="change(1)">
                <label for="taxY2">활성화</label>
              </div>
              <div>
                <input type="radio" id="taxN2" name="taxN2" value="1" :checked="status == 0" @click="change(0)">
                <label for="taxN2">비활성화</label>
              </div>
              <div>
                <input type="radio" id="taxN3" name="taxN3" value="2" :checked="status == 2" @click="change(2)">
                <label for="taxN3">삭제</label>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>로펌타이틀</th>
          <td colspan="3">
            <input class="input dinput" style="width: 80%" type="text" placeholder="로펌 이름을 입력해주세요." v-model="title" />
          </td>
        </tr>
        <tr>
          <th>로펌설명</th>
          <td colspan="3">
              <textarea
                  class="input memo"
                  placeholder="로펌 설명을 입력해주세요."
                  v-model="introduction"
              ></textarea>
          </td>
        </tr>
        <tr>
          <th>메모</th>
          <td colspan="3">
              <textarea
                  class="input memo"
                  placeholder="메모란입니다."
                  v-model="memo"
              ></textarea>
          </td>
        </tr>
        <tr>
          <th>로펌 프로필</th>
          <td colspan="3">
            <label>
              <input type="file" id="file" ref="file"  @change="handleFileChange">
            </label>
            <input type="text" readonly="readonly" title="File Route" id="fileRoute" placeholder="파일 업로드" class="input-box w100p" v-model="filePath1" />
          </td>
        </tr>
        <tr>
          <th>로펌 프로필 미리보기</th>
          <td colspan="3">
            <img :src="previewImage1" alt="미리보기 이미지" v-if="previewImage1" ref="previewImg1">
            <span v-else>이미지 미리보기</span>
            <p v-if="imageWidth1 && imageHeight1">가로: {{ imageWidth1 }}px, 세로: {{ imageHeight1 }}px</p>
          </td>
        </tr>
        <tr>
          <th>로펌 테마</th>
          <td colspan="3">
            <label>
              <input type="file" id="file" ref="file" @change="handleFileChange2">
            </label>
            <input type="text" readonly="readonly" title="File Route" id="fileRoute" placeholder="파일 업로드" class="input-box w100p" v-model="filePath2" />
          </td>
        </tr>
        <tr>
          <th>로펌 테마 미리보기</th>
          <td colspan="3">
            <img :src="previewImage2" alt="미리보기 이미지" v-if="previewImage2" ref="previewImg2">
            <span v-else>이미지 미리보기</span>
            <p v-if="imageWidth2 && imageHeight2">가로: {{ imageWidth2 }}px, 세로: {{ imageHeight2 }}px</p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="detail_tb">
      <div class="tb_info">
        <h3>판사 설정</h3>
      </div>
      <table class="table">
        <tbody class="tb1">
        <tr>
          <th>대표판사</th>
          <td>
            <h1>{{user}}</h1>
          </td>
          <td style="border-left:none"></td>
        </tr>
        <tr>
          <th>판사 조회</th>
          <td colspan="2">
            <div class="flexOption">
              <input type="text" class="input" placeholder="닉네임을 입력해주세요" v-model="nickName" @keyup.enter="search">
              <button class="btn" style="cursor: pointer" @click="search">조회</button>
            </div>
          </td>
        </tr>
        <tr>
          <th>조회결과(최대10개)</th>
          <td colspan="2">
            <template v-for="(item, index) in list">
              <div class="flexOption" style="margin-bottom: 10px;" :key="index">
                <h1>{{item.nickName}}</h1>
                <button class="btn" style="cursor: pointer" @click="selectUser(item)">선택</button>
              </div>
            </template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="bottom_btn">
      <button type="button" class="btn cancle" @click="back">뒤로가기</button>
      <button type="button" class="btn update" @click="update">수정</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import commonHelpler from "@/store/modules/common/helper";
import cookies from "vue-cookies";
import cookieCont from "@/constants/cookieCont";
import FindDetailLawFirmRequest from "@/dto/lawFirm/FindDetailLawFirmRequest";
import service from "@/http/service";
import FindUserListRequest from "@/dto/lawFirm/FindUserListRequest";
import UpdateLawFirmRequest from "@/dto/lawFirm/UpdateLawFirmRequest";

const MAX_SIZE = 3 * 1024 * 1024 // 최대 파일 크기 3MB

export default {
  name: "LawFirmEnrollPage",
  data () {
    return {
      id: 0,
      title: '',
      introduction: '',
      userId: null,
      profile: null,
      background: null,
      filePath1: '',
      filePath2: '',
      nickName: '',
      memo: '',
      list: [],
      user: '미선택',
      status: 0,
      previewImage1: null,
      previewImage2: null,
      imageWidth1: null, // 이미지 가로 길이 저장 변수
      imageHeight1: null, // 이미지 세로 길이 저장 변수
      imageWidth2: null, // 이미지 가로 길이 저장 변수
      imageHeight2: null, // 이미지 세로 길이 저장 변수
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
      this.profile = file

      const reader = new FileReader();

      reader.onload = (e) => {
        this.previewImage1 = e.target.result;
        // 이미지 로드 후 가로 및 세로 길이 알아내기
        this.$nextTick(() => {
          this.getImageSize1();
        });
      };
      reader.readAsDataURL(file);
    },
    handleFileChange2(e) { // 파일 등록
      let file = e.target.files[0]
      if (!file) return;
      this.filePath2 = e.target.value
      e.target.value = ''; // 동일한 파일 업로드를 위해 초기화
      const ext = this.getExt(file.name)
      if (file.size > MAX_SIZE) { // 사이즈 검사
        alert('파일 크기가 3MB를 초과했습니다.')
        return
      } else if (!ext) return; // 확장자 검사
      file.ext = ext
      this.background = file

      const reader = new FileReader();

      reader.onload = (e) => {
        this.previewImage2 = e.target.result;
        this.$nextTick(() => {
          this.getImageSize2();
        });
      };
      reader.readAsDataURL(file);
    },
    find(id) {
      const param = new FindDetailLawFirmRequest(id);
      service.findLawFirmDetail(param).then(res => {
        if (res.data.resultCode == '00000') {
          const lawFirm = res.data.lawFirm
          this.id = lawFirm.lawFirmId
          this.title = lawFirm.name
          this.status = lawFirm.status
          this.introduction = lawFirm.introduction
          this.filePath2 = lawFirm.background
          this.previewImage1 = lawFirm.profile
          this.previewImage2 = lawFirm.background
          this.filePath1 = lawFirm.profile
          this.user = lawFirm.repName
          this.memo = lawFirm.memo

          if (this.previewImage1) {
            this.$nextTick(() => {
              this.getImageSize1();
            });
          }

          if (this.previewImage2) {
            this.$nextTick(() => {
              this.getImageSize2();
            });
          }

        } else {
          alert('조회실패')
        }
      }).catch(() => alert('조회실패'))
    },
    search() {
      const param = new FindUserListRequest(0, 10, this.nickName)
      service.findLawFirmUser(param)
          .then(res => {
            if (res.data.resultCode == "00000") {
              this.list = res.data.list
            } else {
              alert('조회실패')
            }
          })
          .catch(() => alert('조회실패'))
    },
    selectUser(item) {
      this.user = item.nickName
      this.userId = item.userId
      alert('변경되었습니다.')
    },
    change(status) {
      this.status = status
    },
    getExt(fileName) {
      // const arr = ['bmp' , 'hwp', 'jpg', 'pdf', 'png', 'xls', 'zip', 'pptx', 'xlsx', 'jpeg', 'doc', 'gif'];
      const arr = ['hwp', 'jpg', 'png', 'xls', 'jpeg', 'rofl'];
      const ext =  fileName.split('.').pop().toLowerCase();
      if(!arr.includes(ext)) {
        alert(ext + '파일은 업로드 하실 수 없습니다.');
        return null
      }
      return ext
    },
    getImageSize1() {
      const img = this.$refs.previewImg1;
      if (img) {
        img.onload = () => {
          this.imageWidth1 = img.naturalWidth;
          this.imageHeight1 = img.naturalHeight;
        };
      }
    },
    getImageSize2() {
      const img = this.$refs.previewImg2;

      if (img) {
        img.onload = () => {
          this.imageWidth2 = img.naturalWidth;
          this.imageHeight2 = img.naturalHeight;
        };
      }
    },
    update() {
      if (!this.title || !this.introduction ) {
        alert('데이터를 전부 넣어주세요.')
        return
      }
      const param = new UpdateLawFirmRequest(this.id, this.title, this.introduction, this.userId, this.profile, this.background, this.memo, this.status);
      service.updateLawFirm(param).then(res => {
        if (res.data.resultCode == '00000') {
          alert('수정성공')
          window.history.back()
        } else {
          alert('수정실패')
        }
      })
          .catch(() => {
            alert('수정실패')
          })
    }
  },
}
</script>

<style scoped>

</style>
