// pages/shop_detail/shop_detail.js

const app = getApp()
const http = require('../../utils/http.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        shop_data: {}
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let self = this;
        let id = options.id;
        http.post('shop/detail', { "id": id }, function (ret) {
            let data = ret.data
            if (data.status == 1) {
                wx.setNavigationBarTitle({
                    title: data.data.name,
                    success: function (res) {
                        // success
                    }
                })
                self.setData({ shop_data: data.data })
            } else {
                wx.showToast({
                    title: data.msg,
                    icon: 'none',
                    duration: 2000//持续的时间
                })
            }
        });
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