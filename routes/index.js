"use strict"
const express = require('express');
const router = express.Router();

// token验证
const token = require('../middleware/token');
const TOKEN_TIME = 60 * 60 * 24;
const createdToken = token.createToken;
const decodeToken = token.decodeToken;
const checkToken = token.checkToken;

// 路由方法相关
const account = require('./native/login/login');
const bookData = require('./native/book/index');
/* POST encrypt verify listing. */
router.use('/encrypt', function(req, res, next) {
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Access-Control-Max-Age", "86400");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.end();
    } else {
        next();
        // let token = req.body.token || req.query.token;
        // let decodeData = decodeToken(token);
        // let checkData = checkToken(decodeData);
        // if (checkData === true) {
        //     next();
        // } else {
        //     res.json(checkData);
        // }
    }
})

//账号相关
/* POST users register listing. */
const registerFun = account.registerFun;
router.post('/public/register', registerFun);
/* POST users login listing. */
const loginFun = account.loginFun;
router.post('/public/login', loginFun);


/**
 * POST book query listing
 * 根据分类查询图书
 * type = 0 查询所有图书信息;
 * type=1 仅支持关键字查询;
 * type=2支持关键字 标题 作者 类型 isbn 简介查询;
 * type=3 支持_id查找图书详细信息
 */
const queryBookFun = bookData.queryBookFun;
router.post('/encrypt/queryBook', queryBookFun);

module.exports = router;