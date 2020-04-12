/*
 * @Description:接口页面
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-02-26 19:50:03
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-04-12 13:52:11
 */
import axios from "axios";

const baseUrl = "/api";
const instance = axios.create({
  baseURL: baseUrl
});

export default {
  add(param: any) {
    return instance.post("/chartList/add", param);
  },
  update(param: any) {
    return instance.post("/chartList/update", param);
  },
  delete(chartId: string) {
    return instance.delete(chartId);
  },
  getChartList(param: any) {
    return instance.get("/chartList", { params: param });
  },
  getChartById(chartId: string) {
    return instance.get(`/chartList/${chartId}`);
  },
  getDeletedList() {
    return instance.get("/getDeletedList");
  }
};
