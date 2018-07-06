const app = require("./app");
const graylog2 = require('graylog2');
const graylog = require('graylog-loging');

const logger = new graylog2.graylog({
  servers: [
    {'host': '127.0.0.1',port:12201},
    {'host': '127.0.0.2',port:12201}
  ],
   hostname: 'server.name',
   facility: 'Node.js',
   bufferSize: 1350
});

graylog.init({
  graylogPort: 12201,
  graylogHostname: '192.0.0.1'
})
/*app.use(graylog.logRequest);
app.use(graylog.logResponse);
app.use(graylog.handleErrors)*/

module.exports = logger;
