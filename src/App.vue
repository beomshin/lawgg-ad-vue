<template>
  <div id="app">
    <header-page/>
    <div>
      <router-view/>
    </div>
  </div>
</template>
<script>
import HeaderPage from "@/layout/Header";
export default {
  components: {HeaderPage}
}
</script>