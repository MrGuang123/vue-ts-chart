<!--
 * @Description: 编辑chart页面
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-02-17 23:12:59
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-02-29 23:14:22
 -->
<template>
  <div class="edit-chart">
    <img :src="imgSrc" class="testPicture" alt="" />
    <div class="edit-area">
      <el-input v-model="chartName" placeholder="请输入图表名称"></el-input>
      <div class="run">
        <div class="error-in" v-if="errorInfo"></div>
        <el-button type="primary" @click="submitChart" v-show="true"
          >提交</el-button
        >
        <el-button type="primary" @click="run">运行</el-button>
      </div>
      <div class="editor" id="editor"></div>
    </div>
    <div class="chart-show" id="chartDom"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import echarts from "echarts";
import base64ToBlob from "../utils/base64ToBlob";
import api from "../api/index";

// curl -O -k https://raw.githubusercontent.com/tapdata/geektime-mongodb-course/master/aggregation/dump.tar.gz

let editor: any;
let chart: any;

export default Vue.extend({
  data() {
    return {
      errorInfo: "",
      isAdd: false,
      imgSrc: "",
      chartName: "",
      isCreate: false,
      option: `option = {
    title: {
        text: 'Awesome Chart'
    },
    xAxis: {
        data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    yAxis: {},
    series: [{
        type: 'line',
        data:[220, 182, 191, 234, 290, 330, 310]
    }]
};`
    };
  },
  mounted() {
    this.isCreate = !this.$route.query.chartId;
    let chartId = this.$route.query.chartId;

    this.initEditor();
    this.initChart();
    if (chartId) {
      this.getChartInfo(chartId);
    } else {
      this.run();
    }
    // this.run();
  },
  methods: {
    // 初始化编辑器
    async initEditor() {
      // @ts-ignore
      editor = ace.edit("editor");
      editor.setTheme("ace/theme/chrome");
      // @ts-ignore
      let JavaScriptMode = ace.require("ace/mode/javascript").Mode;
      editor.session.setMode(new JavaScriptMode());

      //启用提示菜单
      // @ts-ignore
      ace.require("ace/ext/language_tools");
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });

      editor.setValue(this.option);

      // editor.destroy();
      // editor.container.remove();
    },
    // 运行chart
    async run() {
      try {
        let optionStr = editor.getCopyText() || editor.getValue();
        let resultJson;
        try {
          // @ts-ignore
          resultJson = window.eval(optionStr);
        } catch (e) {
          this.errorInfo = "代码有误";
        }

        if (resultJson) {
          try {
            chart.setOption(resultJson);
          } catch (e) {
            this.errorInfo = "代码有误";
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 初始化chart
    initChart() {
      let chartDom = document.querySelector("#chartDom");
      // @ts-ignore
      chart = echarts.init(chartDom);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    },
    // 获取图表信息
    async getChartInfo(id: any) {
      let data = await api.getChartById(id);
      let result = data.data.data;

      this.chartName = result.name;
      this.option = result.option;
      editor.setValue(result.option, -1);
      this.run();
    },
    // 提交chart
    async submitChart() {
      if (!this.chartName) {
        this.$message.warning("请输入图表名称");
      }

      let url = chart.getDataURL({
        type: "jpeg",
        pixelRatio: 1,
        backgroundColor: "#fff"
      });

      let blob = base64ToBlob(url);
      let optionStr = editor.getCopyText() || editor.getValue();
      this.imgSrc = URL.createObjectURL(blob);

      let formData = new FormData();
      formData.append("img", blob);
      formData.append("option", optionStr);
      formData.append("chartName", this.chartName);

      try {
        let result;
        if (this.isCreate) {
          result = await api.add(formData);
        } else {
          // @ts-ignore
          formData.append("chartId", this.$route.query.chartId);
          result = await api.update(formData);
        }
        console.log(result);
        this.$message.success("添加或更新成功");
      } catch (e) {
        console.log(e);
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.el-button {
  border-radius: 0;
}
.testPicture {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border: 2px solid #f00;
  z-index: 100;
}
.edit-chart {
  display: flex;
  height: calc(100vh - 80px);
  width: 100%;
  .edit-area {
    flex: 2;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .run {
      height: 36px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      text-align: right;
    }
    .editor {
      flex: 1;
      overflow-y: auto;
    }
  }
  .chart-show {
    flex: 3;
  }
}
</style>
