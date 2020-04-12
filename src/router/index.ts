/*
 * @Description:
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-01-19 17:27:04
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-04-12 13:30:51
 */
import Vue from "vue";
import VueRouter, { RawLocation, Route } from "vue-router";
import chartList from "../views/chartType/chartList.vue";

// 解决路由多次点击报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(
  location: RawLocation
): Promise<Route> {
  // @ts-ignore
  return originalPush.call(this, location).catch(e => e);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "chartList"
  },
  {
    path: "/chartList",
    name: "chartList",
    component: chartList
  },
  {
    path: "/edit",
    name: "edit",
    component: () =>
      import(/* webpackCHunkName: "edit" */ "../views/editChart.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
