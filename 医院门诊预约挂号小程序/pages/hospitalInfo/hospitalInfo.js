// pages/branchInfo/branchInfo.js
const urlApi = require('../../utils/server.api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intro:"",
  },

  //获取医院的简介
  getHospitalIntro: function () {
    var that = this;
    wx.request({
      url: urlApi.getHospitalIntro(),
      method: "get",
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (response) {
        var obj = response.data;
        if (obj.code === 0) {
          that.setData({
            intro: obj.data.intro
          })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHospitalIntro();
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