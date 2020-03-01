/*
 * @Description:
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-01-19 17:27:04
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-02-24 09:20:33
 */
import Vue from "vue";
import VueRouter, { RawLocation, Route } from "vue-router";
import Line from "../views/chartType/line.vue";
import Bar from "../views/chartType/bar.vue";

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
    redirect: "line"
  },
  {
    path: "/line",
    name: "line",
    component: Line
  },
  // {
  //   path: "/bar",
  //   name: "bar",
  //   component: Bar
  // },
  {
    path: "/edit",
    name: "edit",
    component: () =>
      import(/* webpackCHunkName: "edit" */ "../views/editChart.vue")
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
