const http = require('http');

const path = require('path');
const config = require('./config/defaltConfig');
const chalk = require('chalk');
const route = require('./helper/router');

const server = http.createServer((req, res) => {
    const filePath = path.join(config.root, req.url);
    //判断是文件or文件夹
    route(req, res, filePath);
});

server.listen(config.port, config.hostname, () => {
    const result = `http://${config.hostname}:${config.port}`;
    console.log(`Server start at ${chalk.green(result)}`);
});
