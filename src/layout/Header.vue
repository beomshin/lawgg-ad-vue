<template>
  <div class="admin_header">
    <div class="admin_inner">
      <div class="flex">
        <router-link to="/user"  v-if="this.$route.path != '/'">
          <div class="logo" ></div>
        </router-link>
        <ul class="menus" v-if="this.$route.path != '/'">
<!--          <li class="menu">-->
<!--            <router-link to="/index" :class="{ 'on' : this.$route.path == '/index'}">-->
<!--              <a >메인</a>-->
<!--            </router-link>-->
<!--          </li>-->
          <li class="menu">
            <router-link to="/user" :class="{ 'on' : this.$route.path == '/user'}">
              <a >회원</a>
            </router-link>
          </li>
          <li class="menu">
            <router-link to="/lawfirm" :class="{ 'on' : this.$route.path.includes('/lawfirm')}">
              <a >로펌</a>
            </router-link>
          </li>
          <li class="menu">
            <router-link to="/position" :class="{ 'on' : this.$route.path.includes('/position')}">
              <a>포지션 게시판</a>
            </router-link>
          </li>
          <li class="menu">
            <router-link to="/trial" :class="{ 'on' : this.$route.path.includes('/trial')}">
              <a>트라이얼</a>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="logOut" @click="logout"  v-if="this.$route.path != '/'"></div>
      <div id="toast"></div>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import cookieCont from "@/constants/cookieCont";

export default {
  name: "HeaderPage",
  methods: {
    logout() {
      cookies.set(cookieCont.AUTH_COOKIE_NAME, null, '1s')
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>

</style>
