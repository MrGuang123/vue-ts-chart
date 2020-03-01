/*
 * @Description:
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-01-19 17:27:04
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-02-18 23:00:44
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
// import echarts from "echarts";
import "./assets/css/reste.css";
import "./styles.scss";

Vue.use(ElementUI);

Vue.config.productionTip = false;

// Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
