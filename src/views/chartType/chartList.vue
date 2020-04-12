<!--
 * @Description: 图表列表页
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-02-17 18:38:50
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-04-12 14:33:15
 -->
<template>
  <div class="wrap-body">
    <Aside @select="selectTab" />
    <div class="wrap-content">
      <el-button type="primary" class="create-chart" @click="createChart"
        >创建图表</el-button
      >
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
      <!-- <circle-nav></circle-nav> -->
    </div>
  </div>
</template>
<script lang="ts">
// import Vue from "vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import Aside from "../../components/aside.vue";
import CircleNav from "../../components/circleNav.vue";
import api from "../../api/index";

@Component({
  components: {
    Aside,
    CircleNav
  }
})
export default class ChartList extends Vue {
  chartList = [];
  type = "all";

  mounted() {
    this.getChartList();
  }

  async getChartList() {
    let param = {
      type: this.type
    };
    let result = await api.getChartList(param);
    this.chartList = result.data.data || [];
    console.log(result);
  }

  createChart() {
    let routerData = this.$router.resolve({
      path: "/edit",
      query: {
        type: "add"
      }
    });
    window.open(routerData.href, "_blank");
  }

  editChart(chartId: string) {
    console.log(chartId);
    let routerData = this.$router.resolve({
      path: "/edit",
      query: {
        chartId: chartId
      }
    });

    window.open(routerData.href, "_blank");
  }

  selectTab(route: string) {
    console.log(route);
    this.type = route;
    this.getChartList();
  }
}
</script>
<style lang="scss" scoped>
.wrap-body {
  display: flex;
}
.wrap-content {
  flex: 1;
  padding: 80px 30px 50px;
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
.create-chart {
  position: fixed;
  top: 100px;
  right: 30px;
  background-color: #293c55;
  border-color: #293c55;
}
</style>
