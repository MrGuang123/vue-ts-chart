/*
 * @Description:vue配置
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-02-26 16:09:07
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-02-27 21:36:51
 */
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5656",
        pathRewrite: {
          "^/api": ""
        }
        // changeOrigin: true
      }
    }
  }
};
