
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
var moment = require('moment');

// 统一返回格式
var responseData;
router.use((req, res, next) => {
    responseData = {
        success: true,
        message: '',
        data: {},
        total: 0,
        totalPage: 0
    }
    next()
})

// 登录
router.post('/login', function (req, res, next) {
    var userName = req.body.userName
    var password = req.body.passWord

    if (userName === '123' && password === '123') {
        responseData.success = true
        responseData.message = '登录成功'
        responseData.data = {
            userName: '123',
        }
        responseData.data.token = jwt.sign({data: {_id:'123456789',username:'123'},exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12)}, 'jwt-secret')
        res.json(responseData)
        return
    } else {
        responseData.success = false
        responseData.message = '您还不是管理员'
        res.json(responseData)
    }
});

// 获取用户列表（类型：all所有用户，week近一周的用户)
router.post('/user/userList', (req, res, next) => {

    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.pageSize)
    let queryType = req.body.type
    let skip = limit*page
    let orderkey = req.query.orderkey  // 排序的字段
    let sequence = req.query.sequence  // true 顺序， false倒序
    let searchKey = req.query.searchKey

    var sort = {}  // 升序
    sort[orderkey] = 1
    if (sequence === 'false') {
        // 根据日期将数据库倒序排列,最新注册的排列在最前
        sort[orderkey] = -1
    }
    if (queryType === 'all') {  // 全部用户

        let totalCount = 0
        let search = {}
        if (searchKey.length > 0) {
            search = {userName: searchKey}
        }

        User.find(search).count().then((count) => {
            totalCount = count

            User.find(search).sort(sort).limit(limit).skip(skip).then((users) => {
                responseData.success = true
                responseData.message = ''
                responseData.data = users
                responseData.total = totalCount
                responseData.totalPage = totalCount%limit === 0 ? parseInt(totalCount/limit):parseInt(totalCount/limit)+1
                res.json(responseData)

            }).catch((err) => {
                responseData.success = false
                responseData.message = err.message
                responseData.total = 0
                responseData.totalPage = 0
                res.json(responseData)
            })
        })

    }
    if (queryType === 'week') {  // 近一周
        let oldDay = moment().add(-7, 'days').calendar()

        let totalCount = 0
        let search = {}
        let conditions = {creatDate: {$gte: new Date(oldDay)}}
        if (searchKey.length > 0) {
            search = {userName: searchKey}
            conditions = {
                $and: [
                    {creatDate: {$gte: new Date(oldDay)}},
                    search
                ]
            }
        }

        User.find(conditions).count().then((count) => {
            totalCount = count
            User.find(conditions).sort(sort).limit(limit).skip(skip).then((users) => {
                responseData.success = true
                responseData.message = ''
                responseData.data = users
                responseData.total = totalCount
                responseData.totalPage = totalCount%limit === 0 ? parseInt(totalCount/limit):parseInt(totalCount/limit)+1
                res.json(responseData)

            }).catch((err) => {
                responseData.success = false
                responseData.message = err.message
                responseData.total = 0
                responseData.totalPage = 0
                res.json(responseData)
            })
        })

    }
})
module.exports = router;