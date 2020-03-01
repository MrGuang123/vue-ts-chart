/*
 * @Description:base64转换成blob的方法
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-02-26 21:18:26
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-02-27 21:27:04
 */
// @ts-ignore
export default function(base64: string) {
  let bytes = window.atob(base64.split(",")[1]);

  let imageBuffer = new ArrayBuffer(bytes.length);
  let newUnitArray = new Uint8Array(imageBuffer);

  for (var i = 0; i < imageBuffer.byteLength; i++) {
    newUnitArray[i] = bytes.charCodeAt(i);
  }

  return new Blob([newUnitArray], { type: "image/jpeg" });
}
