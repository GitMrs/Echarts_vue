const WebSockt = require('wx');
const path = require('path');
const fileUtils = require('../utils/file_utils');
const wss = new WebSocket({
  port: 9998
});
module.exports.listen = () => {
  wss.on('connection', client => {
    client.on('message', async msg => {
      const payload = JSON.parse(msg);
      if (payload.action === 'getData') {
        // const chartName = payload.chart;
        let filePath = '../data/' + payload.chartName + '.json';
        filePath = path.join(__dirname, filePath);
        const ret = await fileUtils.getFileJsonData(filePath);
        payload.data = ret;
        client.send(payload);
      } else {
        // 不是获取数据
        wss.clients.forEach(client => {
          client.send(msg)
        });
      }
    })
  })
}