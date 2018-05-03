
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
    var article = new Article({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        pulishDate: new Date(),
        isDraft: req.body.isDraft
    })
    article.save().then(() => {
        responseData.success = true
        if (req.body.isDraft) { // 是草稿
            responseData.message = '已保存草稿'
        } else {
            responseData.message = '发布成功'
        }
        res.json(responseData)
    })
})

// 获取文章列表 all 所有   hot 热门   news最新
router.post('/list', (req, res, next) => {
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.pageSize)
    let skip = limit*page

    let type = req.body.type

    let totalCount = 0
    Article.find({isDraft: false}).count().then((count) => {
        totalCount = count

        let sort = {pulishDate: -1}
        let conditions = {isDraft: false}

        if (type === 'all') {
            Article.find(conditions).sort(sort).limit(limit).skip(skip).then((articleList) => {
                responseData.success = true
                responseData.data = articleList
                responseData.total = totalCount
                responseData.totalPage = totalCount%limit === 0 ? parseInt(totalCount/limit):parseInt(totalCount/limit)+1
                res.json(responseData)
            }).catch((err) => {
                responseData.success = false
                res.json(responseData)
            })
        }
        if (type === 'hot') {
            conditions = {
                $and: [
                    {lookNum: {$gte: 20}},
                    {isDraft: false}
                ]
            }
            Article.find(conditions).sort(sort).limit(limit).skip(skip).then((articleList) => {
                responseData.success = true
                responseData.data = articleList
                responseData.total = totalCount
                responseData.totalPage = totalCount%limit === 0 ? parseInt(totalCount/limit):parseInt(totalCount/limit)+1
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
            conditions = {
                $and: [
                    {pulishDate: {$gte: date}},
                    {isDraft: false}
                ]
            }
            Article.find(conditions).sort(sort).limit(limit).skip(skip).then((articleList) => {
                responseData.success = true
                responseData.data = articleList
                responseData.total = totalCount
                responseData.totalPage = totalCount%limit === 0 ? parseInt(totalCount/limit):parseInt(totalCount/limit)+1
                res.json(responseData)
            }).catch((err) => {
                responseData.success = false
                res.json(responseData)
            })
        }
    })

})

// 根据id获取文章信息
router.post('/detail', (req, res, next) => {
    let id = req.body.articleId
    Article.findOne({_id: id}).then((article) => {
        // 浏览数加1
        Article.findByIdAndUpdate(id, {
            lookNum: article.lookNum + 1
        }).then(() => {
        }).catch((err) => {
        })
        responseData.success = true
        responseData.data = article
        res.json(responseData)
    }).catch((err) => {
        console.log(err)
        responseData.success = false
        res.json(responseData)
    })
})

// 根据标签模糊查询文章
router.post('/articleTag', (req, res, next) => {
    let tags = req.body.tags
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.pageSize)
    let skip = limit*page

    let sort = {pulishDate: -1}

    let totalCount = 0
    let condition = {
        $and: [
            {tags: {$in: tags}},
            {isDraft: false}
        ]
    }
    Article.find(condition).count().then((count) => {
        totalCount = count

        Article.find(condition).sort(sort).limit(limit).skip(skip).then((article) => {
            responseData.success = true
            responseData.data = article
            responseData.total = totalCount
            res.json(responseData)
        }).catch((err) => {
            responseData.success = false
            res.json(responseData)
        })
    })
})

// 搜索
router.post('/search', (req, res, next) => {
    let key = req.body.searchKey

    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.pageSize)
    let skip = limit*page

    let sort = {pulishDate: -1}

    const reg = new RegExp(key, 'i')

    let totalCount = 0
    let condition = {
        $or: [
            {title: {$regex: reg}},
            {tags: {$in: [key]}}
        ],
        isDraft: false
    }
    Article.find(condition).count().then((count) => {
        totalCount = count

        Article.find(condition).sort(sort).limit(limit).skip(skip).then((article) => {
            responseData.success = true
            responseData.data = article
            responseData.total = totalCount
            res.json(responseData)
        }).catch((err) => {
            responseData.success = false
            res.json(responseData)
        })
    })
})
module.exports = router;