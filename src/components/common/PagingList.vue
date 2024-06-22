<template>
  <div class="page_nav">
    <div v-if="!isFirst" @click="movePage(perv)" class="prev"> </div>
    <template v-for="(n, index) in endPage">
      <ul :key="index">
      <li  >
            <span class="page_num" :class="{'on' : pageNumber(n) == page }" @click="movePage(pageNumber(n))">
              <a>{{n + startPage}}</a>
            </span>
      </li>
      </ul>
    </template>
    <div v-if="!isLast" @click="movePage(next)" class="next"></div>
  </div>
</template>

<script>
const pageBarCount = 10;

export default {
  name: "PagingList",
  props: ['page', 'totalPage', 'pageNum'],
  computed: {
    curPageBar() { // 현재 페이지 바 번호
      return Math.floor(this.page / pageBarCount);
    },
    startPage() { // 시작 번호
      return this.curPageBar * pageBarCount
    },
    endPage() { // 종료 번호
      const pages = this.totalPage - (this.curPageBar * pageBarCount);
      return pages >= pageBarCount ? pageBarCount : pages
    },
    isFirst() { // 첫번째 페이지바
      return this.curPageBar == 0
    },
    isLast() { // 마지막 페이지 바
      return (this.curPageBar + 1) * pageBarCount >= this.totalPage
    },
    perv() { // 이전 페이지바 이동
      return this.startPage - 1
    },
    next() { // 다음 페이지바 이동
      return this.startPage + pageBarCount
    }
  },
  methods: {
    movePage(page) { // 페이지 번호 이동
      if (this.page == page) return;
      this.$emit('movePage', page)
    },
    pageNumber(n) { // 서버 요청 페이지번호 계산
      return n + this.startPage - 1
    }
  }
}
</script>

<style scoped>

</style>
