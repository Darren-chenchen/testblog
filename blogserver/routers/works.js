
const express = require('express');
const router = express.Router();
const Works = require('../models/works');

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
        total: null,
        totalPage: null
    }
    next()
})

// 发布作品
router.post('/pulishWorks', (req, res, next) => {
    let workId = req.body.workId

    var work = new Works({
        title: req.body.title,
        desc: req.body.desc,
        pulishDate: new Date(),
        picArr: req.body.picArr,
        tags: req.body.tags,
        cover: req.body.cover,
        demoUrl: req.body.demoUrl
    })
    if (workId && workId.length>0) {  // 更新
        Works.findByIdAndUpdate(workId, {
            title: req.body.title,
            desc: req.body.desc,
            pulishDate: new Date(),
            picArr: req.body.picArr,
            tags: req.body.tags,
            cover: req.body.cover,
            demoUrl: req.body.demoUrl
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
        work.save().then(() => {
            responseData.success = true
            responseData.message = '发布成功'
            res.json(responseData)
        }).catch(() => {
            responseData.success = false
            responseData.message = err.message
            res.json(responseData)
        })
    }

})

// 获取作品
router.post('/list', (req, res, next) => {
    let category = req.body.category

    // 根据分类查询
    if (category && category.length > 0) {
        Works.find({tags: {$in: [category]}}).then((list) => {
            responseData.success = true
            responseData.data = list
            res.json(responseData)
        }).catch((err) => {
            responseData.success = false
            res.json(responseData)
        })
    } else { // 查询全部
        Works.find().then((workList) => {
            responseData.success = true
            responseData.data = workList
            res.json(responseData)
        }).catch((err) => {
            responseData.success = false
            res.json(responseData)
        })
    }
})

// 根据作品id获取作品详情
router.post('/detail', (req, res, next) => {
    let id = req.body.workId
    Works.findOne({_id: id}).then((work) => {
        // 浏览数加1
        Works.findByIdAndUpdate(id, {
            lookNum: work.lookNum + 1
        }).then(() => {
        }).catch((err) => {
        })
        responseData.success = true
        responseData.data = work
        res.json(responseData)
    }).catch((err) => {
        responseData.success = false
        responseData.message = err.message
        res.json(responseData)
    })
})

module.exports = router;