<!--
 * @Description: 
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-01-19 17:27:04
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-02-24 14:43:53
 -->
<template>
  <div id="app" class="app">
    <header class="header"></header>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },
  methods: {}
});
</script>

<style lang="scss">
.app {
  background: #f3f3f3;
}
.header {
  height: 80px;
  background: #293c55;
}
</style>
