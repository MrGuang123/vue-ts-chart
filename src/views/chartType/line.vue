<!--
 * @Description: 图表列表页
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-02-17 18:38:50
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-02-29 23:30:56
 -->
<template>
  <div class="wrap-body">
    <Aside @select="selectTab" />
    <div class="wrap-content">
      <div class="chart-list">
        <el-row :gutter="10">
          <el-col
            :xs="8"
            :sm="8"
            :md="6"
            :lg="4"
            :xl="4"
            v-for="chart in chartList"
            :key="chart.chartId"
          >
            <div class="chart-item" @click="editChart(chart._id)">
              <h4 class="chart-title">{{ chart.name }}</h4>
              <div class="img-wrap">
                <img class="chart-poster" :src="chart.poster" alt="" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <circle-nav></circle-nav>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Aside from "../../components/aside.vue";
import CircleNav from "../../components/circleNav.vue";
import api from "../../api/index";
const pic1 = require("../../assets/1.png");
const pic2 = require("../../assets/2.png");
const pic3 = require("../../assets/3.png");
export default Vue.extend({
  data() {
    return {
      chartList: [
        // {
        //   poster: pic1,
        //   chartName: "basic line",
        //   des: "no",
        //   chartId: 1,
        //   type: "line"
        // },
        // {
        //   poster: pic2,
        //   chartName: "custom line",
        //   des: "no",
        //   chartId: 2,
        //   type: "line"
        // },
        // {
        //   poster: pic3,
        //   chartName: "hello line chart",
        //   des: "no",
        //   chartId: 3,
        //   type: "line"
        // }
      ]
    };
  },
  mounted() {
    console.log(api);
    this.getChartList();
  },
  methods: {
    editChart(chartId: string) {
      console.log(chartId);
      let routerData = this.$router.resolve({
        path: "/edit",
        query: {
          chartId: chartId
        }
      });

      window.open(routerData.href, "_blank");
    },
    selectTab(route: string) {
      console.log(route);
    },
    async getChartList() {
      let result = await api.getChartList();
      this.chartList = result.data.data || [];
      console.log(result);
    }
  },
  components: {
    Aside,
    CircleNav
  }
});
</script>
<style lang="scss" scoped>
.wrap-body {
  display: flex;
}
.wrap-content {
  flex: 1;
  padding: 50px 30px;
  min-height: 500px;
  position: relative;
  overflow: hidden;
}
.chart-list {
  .chart-item {
    background: #fff;
    .chart-title {
      color: #293c55;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 10px 10px 2px 10px;
      margin: 0;
      font-weight: normal;
      font-size: 16px;
      height: 30px;
    }
    .chart-poster {
      // display: inline;
      width: 100%;
      height: 100%;
      padding: 8px;
      box-sizing: border-box;
    }
  }
}
.add-chart-wrap {
  position: absolute;
  width: 60px;
  height: 60px;
  top: -30px;
  right: -30px;
  border: 1px solid #ccc;
  border-radius: 50%;
}
</style>
