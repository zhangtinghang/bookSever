"use strict"
const mongoose = require('mongoose');
const config = require('../../../global.config');
const root = config.root;
const typeCode = config.type;
const openDb = require(root + '/db.config').openDb;
//操作数据库
const userDB = require(root + '/dbsql/user');
const resData = config.resData;

exports.registerFun = function(req, res, next) {
    //生成用户信息表
    let reqData = {
            username: req.body.username,
            phone: req.body.phone,
            city: req.body.city,
            avatar: req.body.avatar,
            token: req.body.token,
            money: req.body.money,
            roles: req.body.roles
        }
        //未验证是否数据库中有此数据
    userDB.addUser(reqData, function(result) {
        // console.log(result.success)
        if (result.success == 1) {
            resData(res, result.flag);
        } else if (result.success == 0 && result.flag.code == 11000) {
            // console.log(result.flag.code)
            resData(res, '用户已经注册，请勿重复注册', typeCode.errorMsg, false);
            // res.json()
        } else {
            resData(res, '注册失败，请稍后再试！', typeCode.errorMsg, false);
        }
    })
}

exports.loginFun = function(req, res, next) {
    let findUser = mongoose.model('userObj');
    console.log(req.body.phone)
    let findData = {
            phone: req.body.phone
        }
        // let tokenData = createdToken(findData, TOKEN_TIME);
    let limitData = {
        // 'borrow': 0
    }

    //查询数据
    findUser.find(findData, limitData, function(err, doc) {
            if (err) {
                return resData(res, err, typeCode.errorMsg, false);
            } else if (doc.length == 0) {
                return resData(res, '暂无用户信息');
            } else {
                resData(res, doc[0]);
            }
        })
        //更新数据库中的token
        // findUser.update({
        //     'number': findData.phone
        // }, {
        //     // $set: {
        //     //     token: tokenData
        //     // }
        // }, function(err) {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log("updated");

    //     }
    // })
}