//logs.js
const util = require('../../utils/util.js')
var apiRequest = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
    data: {
        scrollHeight: 0,
        babyId: "",
        done: true,
        page: 0,
        noMore:false,
        is_buy_card:false,
        comment:[],
        starNum:2,
        notComment:[],
        noData:false,
        tipInfo:{
            title: "请先购买会员卡"
        }
    },
    onLoad: function(options){
        var that = this;
        if(app.globalData.is_buy_card){
            that.setData({
                is_buy_card: app.globalData.is_buy_card,
                babyId: app.globalData.userData.baby_id
            });
            wx.getSystemInfo({
                success: function (res) {
                    that.setData({
                        scrollHeight: res.windowHeight
                    });
                }
            })
            this.notCommentList();
            this.commentList();
        }
    },
    onShow: function () {
        if(wx.getStorageSync("comment")){
            this.notCommentList();
            this.commentList();
        }
    },
    //   未评论阅读列表
    notCommentList: function () {
        var that = this;
        var babyId = that.data.babyId;
            var params = {
                baby_id: babyId,
                is_done:0
            }
            apiRequest.request("schoolapi/record", params, true, function (res) {
                if (res.code == 1) {
                    console.log(res);
                    that.setData({
                        notComment:res.data
                    });
                }
            });
    },
    //   已评论阅读列表
    commentList: function () {
        var that = this;
        var babyId = that.data.babyId;
        var loadStatus = that.data.done;            
        if (loadStatus) {
            that.setData({
                page: that.data.page + 1
            });
            var page = that.data.page;
            var params = {
                baby_id: babyId,
                page: page,
                is_done:1,
                limit:5
            }
            apiRequest.request("schoolapi/record", params, true, function (res) {
                if (res.code == 1) {
                    if(res.data.length <= 0){
                        that.setData({
                            noMore:true
                        });
                    }else{
                        that.setData({
                            done: true,
                            comment:that.data.comment.concat(res.data)
                        });
                    }
                    if(that.data.comment.length <= 0){
                        that.setData({
                          noData:true
                        });
                      }
                }
            });
        }
        that.setData({
            done: false
        });           
    },
     
    //   加载更多
    loadMore: function () {
        var noMore = this.data.noMore;
        if(!noMore){
            this.commentList();            
        }
    },
    setBookInfo: function(e){
        var index = e.currentTarget.dataset.index;
        wx.setStorageSync("bookInfo", this.data.notComment[index]);
    }
})
