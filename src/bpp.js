const http = require('http');

const path = require('path');
const conf = require('./config/defaltConfig');
const chalk = require('chalk');
const route = require('./helper/router');
const openUrl = require('./helper/openUrl');


class Server {
    constructor(config) {
        this.conf = Object.assign({}, conf, config);
    }

    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url);
            //判断是文件or文件夹
            route(req, res, filePath,this.conf);
        });

        server.listen(this.conf.port, this.conf.hostname, () => {
            const result = `http://${this.conf.hostname}:${this.conf.port}`;
            console.log(`Server start at ${chalk.green(result)}`);
            openUrl(result);
        });
    }
}
module.exports = Server;
