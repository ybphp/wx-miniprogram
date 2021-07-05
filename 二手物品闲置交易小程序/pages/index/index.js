//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        //接口API授权 type 1.是公共授权  2.登录授权
        if (!wx.getStorageSync("userid")) {
            util.authorization(1, function (data) {
                //微信授权登录
                util.wxLogin();
                //首页统计货量
                that.getIndexData();
            });
        } else if (wx.getStorageSync("userid")) {
            util.authorization(2, function (data) {
                //首页统计货量
                that.getIndexData();
            });
        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    /**
     * 获取首页数据
     */
    getIndexData: function () {
        var that = this;
        //首页统计货量
        util.https(app.globalData.api + "/api/util/getsum", "GET", {},
            function (data) {
                if (data.code == 1001) {
                    that.setData({
                        cargoQuantity: data.data
                    })
                } else {
                    util.toolTip(that, data.message)
                }
            }
        )
    }
})

