<!--
 * @Description: 侧边栏组件
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-02-17 16:54:49
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-04-12 13:39:47
 -->
<template>
  <aside class="aside">
    <el-menu
      default-active="all"
      class="el-menu-vertical-demo"
      background-color="#293c55"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="collapse"
      @select="selectTab"
    >
      <span class="control" @click="collapseAside">{{ direction }}</span>
      <el-menu-item
        :index="menu.menuRoute"
        v-for="menu in menuList"
        :key="menu.menuName"
      >
        <i :class="menu.menuIcon"></i>
        <span slot="title">{{ menu.menuName }}</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class Aside extends Vue {
  direction = "<";
  collapse = false;
  menuList = [
    {
      menuName: "全部",
      menuRoute: "all",
      menuIcon: "el-icon-location"
    },
    {
      menuName: "折线图",
      menuRoute: "line",
      menuIcon: "el-icon-location"
    },
    {
      menuName: "柱状图",
      menuRoute: "bar",
      menuIcon: "el-icon-menu"
    },
    {
      menuName: "饼状图",
      menuRoute: "pie",
      menuIcon: "el-icon-document"
    }
  ];

  selectTab(route: string, keyPath: string): void {
    console.log(route, keyPath);
    this.select(route);
  }

  @Emit()
  select(route: string) {}

  collapseAside(): void {
    this.collapse = !this.collapse;
    this.direction = this.collapse ? ">" : "<";
  }
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo {
  min-height: calc(100vh - 80px);
  .is-active {
    background: #2f3035 !important;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.aside {
  // position: fixed;
  // overflow-y: auto;
  // z-index: 1;
  .control {
    position: absolute;
    top: 50px;
    right: -24px;
    width: 24px;
    height: 50px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
  }
}
</style>
