<template>
  <div class="circle-nav">
    <div class="control-btn" @click.stop="toggleNav">
      <i class="el-icon-menu" v-show="!circleNavShow"></i>
      <i class="el-icon-close" v-show="circleNavShow"></i>
    </div>
    <div class="list-wrapper" v-show="circleNavShow">
      <ul>
        <li v-for="item in circleList" :key="item.name">
          <a @click="gotoMenuItem(item)">{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <div id="overlay" class="overlay"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

interface Item {
  name: string;
  route: string;
  query: {
    [key: string]: any;
  };
}

export default Vue.extend({
  data() {
    return {
      circleList: [
        {
          name: "待定项1",
          route: "",
          query: {}
        },
        {
          name: "待定项2",
          route: "",
          query: {}
        },
        {
          name: "新增图表",
          route: "edit",
          query: {
            type: "add"
          }
        }
      ],
      circleNavShow: false
    };
  },
  mounted() {
    let documentBody = document.documentElement;
    documentBody.addEventListener("click", e => {
      this.circleNavShow = false;
    });
  },
  methods: {
    gotoMenuItem(item: Item) {
      // this.$router.push({
      //   path: item.route,
      //   query: item.query
      // });

      let routerData = this.$router.resolve({
        path: "/edit",
        query: item.query
      });

      window.open(routerData.href, "_blank");
    },
    toggleNav() {
      this.circleNavShow = !this.circleNavShow;
    }
  }
});
</script>
<style lang="scss" scoped>
.circle-nav {
  & * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  .control-btn {
    width: 10vw;
    height: 10vw;
    position: fixed;
    right: -5vw;
    bottom: -5vw;
    font-size: 26px;
    line-height: 6vw;
    padding-left: 2.5vw;
    background-color: rgb(41, 60, 85);
    color: #fff;
    border-radius: 50%;
    cursor: pointer;
    z-index: 11;
    box-shadow: 2px 0 0 rgb(41, 60, 85);
  }

  .list-wrapper {
    width: 20vw;
    height: 20vw;
    position: fixed;
    right: -10vw;
    bottom: -10vw;
    background-color: rgba(41, 60, 85, 0.8);
    border-radius: 50%;
    overflow: hidden;
    transition: all 1s linear;
    z-index: 10;
  }

  .list-wrapper ul {
    margin: 0;
    padding: 0;
  }

  .list-wrapper li {
    list-style: none;
    position: absolute;
    width: 10vw;
    height: 10vw;
    transform-origin: 100% 100%;
    overflow: hidden;
  }

  .list-wrapper li a {
    transform: skew(-61deg) rotate(-75deg);
    position: absolute;
    top: 20%;
    left: 20%;
    width: 150%;
    height: 150%;
    text-decoration: none;
    text-align: center;
    color: #fff;
  }

  .list-wrapper li:hover {
    background-color: teal;
  }

  .list-wrapper li:nth-child(1) {
    transform: rotateZ(0deg) skew(60deg);
  }

  .list-wrapper li:nth-child(2) {
    transform: rotateZ(29deg) skew(60deg);
  }

  .list-wrapper li:nth-child(3) {
    transform: rotateZ(59deg) skew(60deg);
  }

  .overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 2;
  }
}
</style>
