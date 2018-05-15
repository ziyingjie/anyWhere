module.exports = {
    root: process.cwd(),//进程当前工作的目录
    hostname: '127.0.0.1',
    port: 3000,
    compress: /\.(html|js|css|md)/,
    cache: {
        maxAge: 600,
        expires: true,
        cacheControl: true,
        lastModified: true,
        etag: true
    }
};
