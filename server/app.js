const koa = require('koa');
const app = new koa();
const port = 8088;
// 计算服务器计算时间
const reqDuration = require('./middleware/koa_request_duration');
app.use(reqDuration);
// 响应头的中间件
const reqHeader = require('./middleware/koa_request_header');
app.use(reqHeader);
// 获取数据
const reqData = require('./middleware/koa_request_data');
app.use(reqData);
app.listen(port,() => {
  console.log('server start' + port);
});
const webSocketService = require('./service/web_socket_service');
webSocketService.listen();
