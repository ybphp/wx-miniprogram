// pages/doctor/doctor.js
const urlApi = require('../../utils/server.api.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:"",
  },

  
  /**
   * 就诊人列表
   */
  goAddPanson: function () {
    wx.navigateTo({
      url: '../myperson/myperson'
    })
  },

  //押金补交记录
  depositLog: function (e) {
    wx.navigateTo({
      url: '/pages/registerLog/registerLog?type=' + e.currentTarget.dataset.type
    })
  },

  //住院报告
  report: function () {
    wx.navigateTo({
      url: '/pages/report/report'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.sickName == "") {
      that.setData({
        show: "show"
      })
    } else {
      that.setData({
        show: "hidden"
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
})
