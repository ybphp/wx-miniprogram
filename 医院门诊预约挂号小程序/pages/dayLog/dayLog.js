// pages/branchInfo/branchInfo.js
var util = require("../../utils/util.js")
var urlApi = require("../../utils/server.api.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalObj: [],
    title: "住院清单",
    totalPrice: 0,
    dayLog: [],
    sickName: "",
    sickCard: "",
    show: "hidden",
    type: ""
  },

  getDayLog: function () {
    var that = this;
    wx.request({
      url: urlApi.getDayLogUlrl(),
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        RQ: util.formatTime2(new Date()),
        BRID: app.globalData.BRID,
        ZYCS:"1"
      },
      success: function (res) {
        if (res.data.DATAPARAM.FYHJ.ITEM) {
          that.setData({
            pensorShowTop: "hidden",
            pensorShowBottom: "show",
            show: "hidden",
            dayLog: res.data.DATAPARAM.FYHJ.ITEM
          })
        }else{
          that.setData({
            show: "show",
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDayLog();
    this.setData({
      sickName: app.globalData.sickName,
      sickCard: app.globalData.sickCard,
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