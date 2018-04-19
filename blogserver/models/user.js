/**
 * Created by darren on 2018/3/21.
 */

var mongoose = require('mongoose')
var userSchema = require('../schemas/user')

module.exports = mongoose.model('User', userSchema)
