/**
 * Created by darren on 2018/4/11.
 */
var mongoose = require('mongoose')
var commentSchema = require('../schemas/comment')

module.exports = mongoose.model('Comment', commentSchema)