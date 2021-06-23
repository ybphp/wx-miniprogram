// pages/collection/collection.js
var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
const wxurl = app.globalData.wxUrl;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        winWidth: '',
        currentTab: 0,
        username: '',
        goodCollect: {},
        imgurl: imgurl,
        current_page: 1,
        last_page: 1,
        shopCollect: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var that = this;
        var username = common.getUserName()
        this.getGoodCollect();
        this.getShopCollect();
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winHeight: res.windowHeight
                });
            },
        })
    },
    getGoodCollect: function () {
        var that = this
        var username = common.getUserName()
        common.httpG('collect/good', { username: username }, function (data) {
            that.setData({
                goodCollect: data.data,
                page: data.current_page,
                last_page: data.last_page,
            })

        })
    },
    getShopCollect: function () {
        var that = this
        var username = common.getUserName()
        common.httpG('collect/shop_', { username: username }, function (data) {
            if (data.code == 0) {
                that.setData({
                    shopCollect: data.data,
                    page: data.current_page,
                    last_page: data.last_page,
                })
            }
        })
    },
    houseChange(e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        })
    },

    switchNav(e) {
        var that = this;
        if (that.data.currentTab === e.target.dataset.current) {
            return false
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
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
        wx.showToast({
            title: '正在加载',
            icon: 'loading',
            duration: 10000
        })
        var that = this;
        wx.request({
            url: wxurl + 'collect/good',
            success: (res) => {
                that.setData({
                    goodCollect: res.data.data
                });
            },
            complete: () => {
                //结束下拉刷新
                wx.stopPullDownRefresh();
                setTimeout(() => {
                    wx.hideToast();
                }, 600)
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var that = this;
        var current_page = that.data.current_page
        var username = wx.getStorageSync('username')
        var page = current_page + 1;
        if (current_page < that.data.last_page) {
            wx.request({
                url: wxurl + 'collect/good',
                data: {
                    username: username,
                    page: page,
                },
                success: (res) => {
                    that.setData({
                        current_page: res.data.current_page,
                        goodCollect: that.data.goodCollect.concat(res.data.data),

                    })
                },
                complete: () => {
                    setTimeout(() => {
                        wx.hideToast();
                    }, 600)
                },
            });
        } else {
            wx.showToast({
                title: '没有更多啦',
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})