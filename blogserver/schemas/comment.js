/**
 * Created by darren on 2018/4/11.
 */

var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
    // 评论人
    userName: String,
    // 内容
    content: String,
    // 回复数组
    replyArr: Array,
    // 评论时间
    commentTimer: Date
})