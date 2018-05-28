const Schema = require('../Schema/Schema');
const bookObj = Schema.bookObj;
const dbHelper = require('../dbhelper/dbhelper');
/** 
 * 调用公共add方法并且传入操作数据库的模型book
 * @returns {Function} 
 */
exports.addBook = function(reqData, callback) {
    //获取book模型
    var bookModel = new bookObj(reqData);
    dbHelper.addData(bookModel, function(result) {
        callback(result);
    });
};
/** 
 * 调用公共find方法并且传入操作数据库的模型book,非关联查找
 * @param conditions 
 * @param callback 
 */
exports.findBook = function(conditions, callback) {
    var fields = {};
    var options = {
        sort: ['_id', 1]
    };

    dbHelper.findData(bookModel, conditions, fields, options, function(result) {
        callback(result);
    });

}

/** 
 * 调用公共remove方法并且传入操作数据库的模型book
 * @param conditions 
 * @param callback 
 */
exports.removeBook = function(conditions, callback) {
    dbHelper.removeData(bookModel, conditions, function(result) {
        callback(result);
    });
}

/** 
 * 调用公共update方法并且传入操作数据库的模型user 
 * @param conditions 
 * @param update 
 * @param options 
 * @param callback 
 */
exports.updateUser = function(conditions, update, options, callback) {

    dbHelper.updateData(bookModel, conditions, update, options, function(result) {
        callback(result);
    });
}