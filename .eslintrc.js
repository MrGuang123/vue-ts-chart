/*
 * @Description: 
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-01-19 17:27:04
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-02-17 16:58:39
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // "quotes": [1, "single"],
    // "semi": [2, "never"]
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
