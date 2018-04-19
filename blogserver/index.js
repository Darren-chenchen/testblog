
/**
 * Created by darren on 2018/4/19.
 */
var express = require('express');
var app = express();

app.get('/', function(res, rep) {
    rep.send('Hello, word!');
});

app.listen(4000);
