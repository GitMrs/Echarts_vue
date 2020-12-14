// 获取数据
const path = require('path');
const fileUtils = require('../utils/file_utils');
module.exports = async (ctx,next) => {
  const url = ctx.request.url;
  let filePath = url.replace('/api','');
  filePath = '../data' + filePath + '.json';
  filePath = await path.join(__dirname, filePath);
  try {
    const ret = await fileUtils.getFileJsonData(filePath);

    ctx.response.body = ret;
  } catch (error) {
    const errorMsg = {
      message: '读取文件失败，文件资源不存在',
      status: 404
    }
    ctx.response.body = JSON.stringify(errorMsg);
  }
  await next();
};