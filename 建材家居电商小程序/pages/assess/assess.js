// pages/assess/assess.js
var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;

const wxurl = app.globalData.wxUrl;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgurl: imgurl,
        getList: [],
        username: '',
        current_page: 1,
        last_page: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var username = common.getUserName();
        this.getList(username);
    },

    //获取我的所有评价
    getList: function (username) {
        var that = this;
        common.httpG('fankui/getFankui',
            { username: username, },
            function (data) {
                if (data.code == 0) {
                    that.setData({
                        getList: data.data,
                       // page: data.data.current_page,
                       // last_page: data.data.last_page
                    });
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
    //   onPullDownRefresh: function () {
    //     wx.showToast({
    //       title: '正在加载',
    //       icon:'loading',
    //       duration:10000
    //     })
    //     var that = this;
    //     wx.request({
    //       url: wxurl + 'fankui/getFankui',
    //       success:(res)=>{
    //         that.setData({
    //           getList: res.data.data
    //         });
    //       },
    //       complete:()=>{
    //         //结束下拉刷新
    //         wx.stopPullDownRefresh();
    //         setTimeout(() => {
    //           wx.hideToast();
    //         }, 600)
    //       }
    //     })
    //   },

    /**
     * 页面上拉触底事件的处理函数
     */
    //   onReachBottom: function () {
    //     var that = this;
    //     var current_page = that.data.current_page
    //     var username = common.getUserName()
    //     var page = current_page + 1;
    //     if (current_page < that.data.last_page) {
    //       wx.request({
    //         url: wxurl + 'fankui/getFankui',
    //         data: {
    //           username:username,
    //           page: page,
    //         },
    //         success: (res) => {
    //           that.setData({
    //             current_page: res.data.current_page,
    //             // getList: that.data.getList.concat(res.data.data.data),
    //           })
    //         },
    //         complete: () => {
    //           setTimeout(() => {
    //             wx.hideToast();
    //           }, 600)
    //         }
    //       });
    //     };

    //   },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})