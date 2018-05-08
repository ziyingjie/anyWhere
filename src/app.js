const http = require('http');
const config = require('./config/defaltConfig');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const server = http.createServer((req, res) => {
    const filePath = path.join(config.root, req.url);
    //判断是文件or文件夹
    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`${filePath} is not a file or directory`);
            return;
        }
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.createReadStream(filePath).pipe(res);
            return;
        } else if (stats.isDirectory()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.readdir(filePath, (err, files) => {
                res.end(files.join(','));
            });
            return;
        }
    });
});

server.listen(config.port, config.hostname, () => {
    const result = `http://${config.hostname}:${config.port}`;
    console.log(`Server start at ${chalk.green(result)}`);
});
