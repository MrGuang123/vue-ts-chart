/*
 * @Description:
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-01-19 17:27:04
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-01-19 17:44:17
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
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
