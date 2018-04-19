/**
 * Created by darren on 2018/4/10.
 */
var mongoose = require('mongoose')
const Schema = mongoose.Schema;

module.exports = new mongoose.Schema({
    // 文章标题
    title: String,
    // 文章内容 md
    content: String,
    // 文章内容html内容
    htmlContent: String,
    // 文章标签
    tags: Array,
    // 发布时间
    pulishDate: Date,
    // 是否为草稿
    isDraft: false,
    // 查看次数
    lookNum: {type: Number, default: 0},
    // 评论次数
    commentNum: {type: Number, default: 0},
    // 所有评论
    commentList: Array
})