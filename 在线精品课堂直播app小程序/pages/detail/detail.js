// pages/detail/detail.js
const http = require('../../utils/http.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail_bar: 0,
        detail_data:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id;
        let that = this;
        http.post(http.GET_DETAIL, {id: id}, function(ret){
            let data = ret.data.data;
            that.setData({
                detail_data: data
            });
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

    },
    setDetailBar: function (event){
        let index = event.currentTarget.dataset.index;
        this.setData({
            detail_bar: index
        });
    }
})