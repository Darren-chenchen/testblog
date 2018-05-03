
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Article = require('../models/article');
const Reply = require('../models/reply');

// 统一返回格式
var responseData;
router.use((req, res, next) => {
    responseData = {
        success: true,
        message: '',
        data: {},
        total: null,
    }
    next()
})

// 发表评论
router.post('/commit', (req, res, next) => {
    //1.根据文章id，在文章的commentList中插入一条数据
    let articleId = req.body.articleId

    var comment = new Comment({
        userName: req.body.userName,
        content: req.body.content,
        commentTimer: new Date()
    })

    // 更新文章的commentList属性
    Article.update({_id: articleId}, {$push: {
        commentList: comment
    }}).then((article) => {

        Article.findOne({_id: articleId}).then((article) => {
            // 评论数加1
            Article.findByIdAndUpdate(articleId, {
                commentNum: article.commentNum + 1
            }).then(() => {
            }).catch((err) => {
            })
        }).catch((err) => {
        })

        responseData.success = true
        responseData.message = '提交成功'
        res.json(responseData)
    }).catch((err) => {
        responseData.success = false
        responseData.message = err.message
        res.json(responseData)
    })

})

// 回复评论
router.post('/reply', (req, res, next) => {

    let articleId = req.body.articleId
    let commentId = req.body.commentId

    var reply = new Reply({
        replyUser: req.body.replyUser,
        content: req.body.content,
        acceptUser: req.body.acceptUser,
        replyTimer: new Date()
    })

    Article.findOne({_id: articleId}).then((article) => {

         var arr = []
        for (let i = 0; i < article.commentList.length; i ++) {
            let comment = article.commentList[i]
            if (comment._id == commentId) {
                comment.replyArr.push(reply)
            }
            arr.push(comment)
        }

        Article.updateOne({_id: articleId}, {commentList: arr}).then((article) => {
            responseData.success = true
            responseData.message = '回复成功'
            res.json(responseData)
        }).catch((err) => {
            responseData.success = false
            responseData.message = err.message
            res.json(responseData)
        })

    }).catch((err) => {
        responseData.success = false
        responseData.message = err.message
        res.json(responseData)
    })



})


module.exports = router;