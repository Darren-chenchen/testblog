/**
 * Created by darren on 2018/3/21.
 */
var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    // 用户名
    userName: String,
    // 密码
    passWord: String,
    // 注册日期
    creatDate: Date,

    token: String
})