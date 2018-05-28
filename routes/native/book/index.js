const https = require('https');

//连接mongodb
const config = require('../../../global.config');
const root = config.root;
const type = config.type;
const resData = config.resData;
const book = require(root + '/dbsql/book');

/**
 * POST book query listing
 * 根据分类查询图书
 * type = 0 查询所有图书信息;
 * type = 1 仅支持关键字查询;
 * type = 2 支持关键字 标题 作者 类型 isbn 简介查询;
 * type = 3 支持_id查找图书详细信息
 * type = 5 支持isbn码查找图书信息
 */
exports.queryBookFun = function(req, response, next) {
    var keywords = req.body.keywords;
    var type = req.body.type;
    if (type == 0) {
        findBook({}, function(data) {
            console.log('查询所有数据集', JSON.stringify(data))
        })
    } else if (type == 1) {

    }
}