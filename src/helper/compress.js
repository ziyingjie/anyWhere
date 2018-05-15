const { createGzip, createDeflate } = require('zlib');
//这里只压缩文件
module.exports = (rs, req, res) => {
    //首先先拿到文件createReadStream 然后再获取浏览器支持的压缩方式 然后再传给响应 用哪种方式解压
    const acceptEncoding = req.headers['accept-encoding'];
    //  正则 \b  \b 是单词边界  比如说 \b(gizp)\b 这样 gizp5就匹配不到了
    if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
        return rs;
    } else if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip');
        return rs.pipe(createGzip());
    } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate');
        return rs.pipe(createDeflate());
    }
};