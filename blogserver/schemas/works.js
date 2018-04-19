/**
 * Created by darren on 2018/4/10.
 */
var mongoose = require('mongoose')
const Schema = mongoose.Schema;

module.exports = new mongoose.Schema({
    // 作品标题
    title: String,
    // 作品描述
    desc: String,
    // 发布时间
    pulishDate: Date,
    // 查看次数
    lookNum: {type: Number, default: 0},
    // 图片列表
    picArr: Array,
    // 标签
    tags: Array,
    // 封面
    cover: String,
    // 代码下载地址
    demoUrl: String
})