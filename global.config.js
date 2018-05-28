"use strict"

function response(res, data, type, succ, errno) {
    let typeCode = type || 2000;
    let errnoNum = errno || 0;
    let success = succ || true;
    res.status(200)
    res.json({
        type: typeCode,
        errno: errnoNum,
        success: success,
        msg: data
    })
    return res;
}

module.exports = {
    resData: response,
    root: __dirname,
    type: {
        successMsg: 2000,
        errorMsg: 4000,
        serverMsg: 5000,
        limitMsg: 6000
    }
}