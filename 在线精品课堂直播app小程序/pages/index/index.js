//index.js
//获取应用实例
const app = getApp()
const http = require('../../utils/http.js')
Page({
    data: {
        banner_list:[],
        course_list:[],
    },
    onLoad: function () {
        let that = this;
        http.post(http.GET_BANNER, '', function(ret){
            let data = ret.data.data
            for (let i in data){
                data[i]['url'] = '/pages/detail/detail';
            }
            that.setData({
                banner_list: data
            })
        })
        http.post(http.GET_COURSE_LIST, '', function (ret) {
            let data = ret.data.data
            that.setData({
                course_list: data
            })
        })
    },
})
