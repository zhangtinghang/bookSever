var express = require('express');
var router = express.Router();
//图书相关函数
var book = require('./admin/book/book');

//拦截所有加密请求，验证token
router.use('/encrypt', function(req, res, next) {
    next();
})

/**
 * POST book isbn add data listing.
 * 图书录入
 */
const addBookFun = book.addBookFun;
router.post('/public/addBook', addBookFun);

module.exports = router;