//logs.js
const util = require('../../utils/util.js')
var apiRequest = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
    data: {
        scrollHeight: 0,
        babyId: "",
        loadStatus: true,
        page: 0,
        recordArr:[],
        noMore:false,
        is_buy_card:false,
        noData:false,
        tipInfo:{
            title: "请先购买会员卡"
        }
    },
    onShow: function () {
        var that = this;
        if (app.globalData.is_buy_card){
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
            this.recordList();
        }
    },
    //   阅读记录列表
    recordList: function () {
        var that = this;
        var babyId = that.data.babyId;
        var loadStatus = that.data.loadStatus;
        if (loadStatus) {
            that.setData({
                page: that.data.page + 1
            });
            var page = that.data.page;
            var params = {
                baby_id: babyId,
                page: page,
                limit: 5
            }
            apiRequest.request("schoolapi/record", params, true, function (res) {
                if (res.code == 1) {
                    console.log(res);
                    if(res.data.length <= 0){
                        that.setData({
                            noMore:true
                        });
                        return false;
                    }
                    that.setData({
                        loadStatus: true,
                        recordArr:that.data.recordArr.concat(res.data)
                    });
                    if(that.data.recordArr.length <= 0){
                        that.setData({
                            noData:true
                        });
                    }
                    console.log(that.data.recordArr.length)
                }
            });
        }
        that.setData({
            loadStatus: false
        });

    },
    //   加载更多
    loadMore: function () {
        var noMore = this.data.noMore;
        if(!noMore){
            this.recordList();            
        }
    }
})
