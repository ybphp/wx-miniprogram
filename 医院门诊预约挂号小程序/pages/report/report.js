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
    title: "报告查询",
    totalPrice: 0,
    dayLog: [],
    sickName: "",
    sickCard: "",
    show: "hidden",
    type: ""
  },

  report: function () {
    var that = this;
    wx.request({
      url: urlApi.getReportUrl(),
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        TYPE: 0,
        DQYS:1,
        RNOM:"",
        BRID: app.globalData.BRID,
        JLTS:"100"
      },
      success: function (res) {
        if (res.data.DATAPARAM.BGLIST != "") {
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
    this.report();
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