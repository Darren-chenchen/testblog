/**
 * Created by darren on 2018/4/10.
 */
var mongoose = require('mongoose')
var articleSchema = require('../schemas/article')

module.exports = mongoose.model('Article', articleSchema)
