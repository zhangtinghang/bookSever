const https = require('https');

//连接mongodb
const config = require('../../../global.config');
const root = config.root;
const type = config.type;
const resData = config.resData;
const book = require(root + '/dbsql/book');

/** 
 * 用于前端时
 * 通过isbn码添加图书
 * 用于PC端时
 * 若无isScan，则代表手动添加，无需请求，但需自己构造数据
 */
exports.addBookFun = function(req, response, next) {
    const isbn = req.body.isbn;
    const isScan = req.body.isScan || true;
    const bookData = req.body.bookData || {};
    const localtion = req.body.localtion;
    if (isScan) {
        //通过isbn码发起请求，请求API为豆瓣v2
        const addOptions = {
            hostname: 'api.douban.com',
            path: '/v2/book/isbn/:' + isbn,
            method: 'GET'
        };
        //发送请求
        const req = https.request(addOptions, function(res) {
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                chunk = JSON.parse(chunk);
                const dataObj = {
                    id: chunk.id,
                    isbn13: chunk.isbn13,
                    isbn10: chunk.isbn10,
                    title: chunk.title,
                    author: chunk.author,
                    tags: chunk.tags,
                    images: chunk.images,
                    publisher: chunk.publisher,
                    author_intro: chunk.author_intro,
                    summary: chunk.summary,
                    price: chunk.price
                }
                book.addBook(dataObj, function(data) {
                    if (data.success == 1) {
                        resData(response, data.flag);
                    } else {
                        resData(response, data.flag, type.errorMsg, false);
                    }
                })
            });
        });

        //如果有错误会输出错误
        req.on('error', function(e) {
            resData(response, e.message, type.errorMsg, false);
            console.log('图书信息存入数据库错误：' + e.message);
        });
        req.end();
    }
}