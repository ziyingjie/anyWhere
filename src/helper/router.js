const promisify = require('util').promisify;
const fs = require('fs');
const path = require('path');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const Handlebars = require('handlebars');


// __dirname变量获取当前模块文件所在目录的完整绝对路径
const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
//readdirSync readdir都是异步 并且读出来的是 Buffer
//这里为什么是要用同步 主要是因为读模板 只需要读一次就行了  再执行会读缓存
const template = Handlebars.compile(source.toString());
const config = require('../config/defaltConfig');

module.exports = async function (req, res, filePath) {
    const stats = await stat(filePath);
    try {
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            //做一个可读的流  用pipe方法传给响应 好处 不用一次性把东西存到内存中 可以返回一点处理一点 高并发下表现更好
            fs.createReadStream(filePath).pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');

            const dir = path.relative(config.root, filePath);
            const data = {
                title: path.basename(filePath),//文件夹的名字
                dir: dir ? `${dir}` : '',
                files
            }
            res.end(template(data))
        }
    } catch (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a file or directory`);
    }
}
