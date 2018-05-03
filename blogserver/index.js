
/**
 * Created by darren on 2018/4/19.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('express-jwt');

app.use(express.static('uploads'))

// token相关regiest和login不需要token验证
var jwt = require('express-jwt');
app.use(jwt({secret: 'jwt-secret', debug: true}).unless({
    path: ['/user/regiest', '/user/login', '/admin/login', '/works/list', '/works/detail']
}))

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        if (req.path.indexOf("/tourist") != -1 || req.path.indexOf("/static") != -1) {
            next()
        } else {
            res.status(401).send('invalid token...');
        }
    }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user',require('./routers/user'));
app.use('/admin',require('./routers/admin'));
app.use('/article',require('./routers/article'));
app.use('/works',require('./routers/works'));
app.use('/tourist',require('./routers/tourist'));
app.use('/comment',require('./routers/comment'));

// 加载数据库模块
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/testblog',function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(4000);
    }
});