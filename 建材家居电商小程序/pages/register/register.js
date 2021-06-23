// pages/register/register.js
var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgurl: imgurl,
        baoming: [],  //难房报名，只有一个
        attendList: [], //在线报名列表
        setting:null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getBaoming()
        this.getAttendList()
        this.setData({
            setting:wx.getStorageSync('setting')
        })
    },
    //取我的在线报名
    getAttendList: function () {
        var that = this;
        var username = common.getUserName()
        common.httpG('activity/my_attend', {
            username: username,
        }, function (data) {
            if (data.code == 0) {
                that.setData({
                    attendList: data.data
                })
            }
        })
    },
    //取我的验房报名
    getBaoming: function () {
        var that = this;
        var username = common.getUserName();
        common.httpG('baoming/read', {
            username: username,
        }, function (data) {
            if (data.code == 0) {
                that.setData({
                    baoming: data.data
                })
            }
        })
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

    }
})