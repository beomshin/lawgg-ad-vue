<template>
  <div class="wrap">
    <div class="header headerL"></div>
    <div class="content login">
      <div class="loginHeader">
        <div class="lhTxt">
          <h2>로우지지 로그인</h2>
          <p>본 사이트는 로우지지를 위한 전용사이트입니다.</p>
        </div>
      </div>
      <div class="loginContent">
        <div class="lcInner">
          <input type="text"  placeholder="아이디를 입력하세요" class="input" v-model="loginId" />
          <input type="password" placeholder="비밀번호를 입력하세요" class="input" v-model="password" @keyup.enter="submit"/>
          <button type="button" class="btn" @click="submit">로그인</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import LoginRequest from "@/dto/auth/LoginRequest";
import service from "@/http/service";
import commonHelper from "@/store/modules/common/helper";
import {mapMutations} from "vuex";
import cookies from "vue-cookies";
import cookieCont from "@/constants/cookieCont";

export default {
  data() {
    return {
      loginId: '',
      password: ''
    };
  },
  methods: {
    ...mapMutations(commonHelper.name, commonHelper.mutations),
    submit() {
      const param = new LoginRequest(this.loginId, this.password)
      service.normalLogin(param).then(res => {
        if (res.data.resultCode == "00000") {
          cookies.set(cookieCont.AUTH_COOKIE_NAME, res.data.accessToken, '1h')
          this.setToken(res.data.accessToken)
          this.$router.replace('/user')
        } else {
          alert('로그인실패')
        }
      }).catch(() => alert('로그인실패'))
    }
  }
};
</script>
