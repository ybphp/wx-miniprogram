// pages/util/help.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getHelpData(options.id);
/*        wx.showShareMenu({
            withShareTicket: true
        })*/
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
    onShareAppMessage: function (res) {

    },
    /**
     * 获取帮助数据
     */
    getHelpData: function (id) {
        var that = this;
        //首页统计货量
        util.https(app.globalData.api + "/api/AboutUs/getaboutus", "GET", {ID:id},
            function (data) {
                if (data.code == 1001) {
                    that.setData({
                        helpdata: data.data
                    })
                } else {
                    util.toolTip(that, data.message)
                }
            }
        )
    }
})