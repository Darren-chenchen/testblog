/**
 * Created by darren on 2018/4/11.
 */
var mongoose = require('mongoose')
var replySchema = require('../schemas/reply')

module.exports = mongoose.model('Reply', replySchema)