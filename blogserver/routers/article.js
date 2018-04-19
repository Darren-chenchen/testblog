
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Article = require('../models/article');

// 统一返回格式
var responseData;
router.use((req, res, next) => {
    responseData = {
        // 主要根据success来判断是否请求成功，code是一个预留的参数，比如前端需要根据code的不同值去做不同的操作
        // code 默认情况下都是0，只有在特殊接口中才返回不同的值，代表不同的意义
        success: true,
        code: 0,
        message: '',
        data: {},
        total: 0,
        totalPage: 0
    }
    next()
})

// 发布文章
router.post('/pulish', (req, res, next) => {
    let articleId = req.body.articleId
    var article = new Article({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        pulishDate: new Date(),
        isDraft: req.body.isDraft,
        htmlContent: req.body.htmlContent
    })
    if (articleId && articleId.length>0) {  // 更新
        Article.findByIdAndUpdate(articleId, {
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags,
            pulishDate: new Date(),
            isDraft: req.body.isDraft,
            htmlContent: req.body.htmlContent
        }).then(() => {
            responseData.success = true
            responseData.message = '发布成功'
            res.json(responseData)
        }).catch((err) => {
            responseData.success = false
            responseData.message = err.message
            res.json(responseData)
        })
    } else {
        article.save().then(() => {
            responseData.success = true
            if (req.body.isDraft) { // 是草稿
                responseData.message = '已保存草稿'
            } else {
                responseData.message = '发布成功'
            }
            res.json(responseData)
        }).catch(() => {
            responseData.success = false
            responseData.message = err.message
            res.json(responseData)
        })
    }

})

// 获取文章列表 all 所有   hot 热门   news最新
router.post('/list', (req, res, next) => {
    let type = req.body.type
    if (type === 'all') {
        Article.find().then((articleList) => {
            responseData.success = true
            responseData.data = articleList
            res.json(responseData)
        }).catch((err) => {
            responseData.success = false
            res.json(responseData)
        })
    }
    if (type === 'hot') {  // 包含草稿
        Article.find({lookNum: {$gte: 50}}).then((articleList) => {
            responseData.success = true
            responseData.data = articleList
            res.json(responseData)
        }).catch((err) => {
            responseData.success = false
            res.json(responseData)
        })
    }
    if (type === 'news') {
        // 最新，最近3个月的文章
        var date = new Date()
        date.setMonth(date.getMonth() - 3)
        Article.find({pulishDate: {$gte: date}}).then((articleList) => {
            responseData.success = true
            responseData.data = articleList
            res.json(responseData)
        }).catch((err) => {
            responseData.success = false
            res.json(responseData)
        })
    }
    if (type === 'draft') {  // 包含草稿
        Article.find({isDraft: true}).then((articleList) => {
            responseData.success = true
            responseData.data = articleList
            res.json(responseData)
        }).catch((err) => {
            responseData.success = false
            res.json(responseData)
        })
    }
})

// 根据id获取文章信息
router.post('/detail', (req, res, next) => {
    let id = req.body.articleId
    Article.findOne({_id: id}).then((article) => {
        responseData.success = true
        responseData.data = article
        res.json(responseData)
    }).catch((err) => {
        console.log(err)
        responseData.success = false
        res.json(responseData)
    })
})

// 删除文章
router.delete('/delete', (req, res, next) => {
    let id = req.query.articleId
    Article.deleteOne({_id: id}).then(() => {
        responseData.success = true
        responseData.message = '删除成功'
        res.json(responseData)
    }).catch((err) => {
        console.log(err)
        responseData.success = false
        responseData.message = '删除失败'
        res.json(responseData)
    })
})
// 下架文章，将文章设置成草稿
router.post('/draftArticle', (req, res, next) => {
    let id = req.query.articleId
    Article.updateOne({_id: id}, {isDraft: true}).then(() => {
        responseData.success = true
        responseData.message = '文章已成功下架'
        res.json(responseData)
    }).catch((err) => {
        console.log(err)
        responseData.success = false
        responseData.message = '下架失败'
        res.json(responseData)
    })
})

module.exports = router;