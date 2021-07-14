// pages/addNote/addNote.js
var apiRequest = require('../../utils/api.js');
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        starNum: 3,
        stars: 5,
        files: [],
        readTime: 0,
        readWay: 0,
        comment: "",
        instro: ["一般", "喜欢", "很喜欢", "满意", "非常满意"],
        timeText: ["10分钟", "15分钟", "15分钟以上"],
        wayText: ["自读", "亲子阅读"],
        recordId:0,
        is_buy_card:false,
        detailData:{}
    },
    onLoad: function(options){
        this.setData({
            recordId:options.id,
            is_buy_card: app.globalData.is_buy_card
        });
        this.commentDetail();
    },
    // 获取图书评论详情
    commentDetail: function(){
        var that = this;
        var params = {
            id:that.data.recordId
        };
        apiRequest.request("schoolapi/record_info",params,true,function(res){
            if(res.code == 1){
                that.setData({
                    detailData:res.data
                });
            }
        });
    },
    // 图片预览
    previewImage: function (e) {
        var picArr = this.data.detailData.pic_arr;
        var pic_imgs = [];
        for(var i in picArr){
            pic_imgs.push(picArr[i]['url']);
        }
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: pic_imgs // 需要预览的图片http链接列表
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})