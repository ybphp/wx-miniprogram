// pages/login/login.js
var app = getApp()
var testData = require("../../utils/testData.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true, //是否要显示 加载中 页面
    needAuthorize: false, //是否需要授权
    isOldVersion: false, //微信是否为旧版本
  },

  /* 点击按钮获取用户信息 监听器 */
  getUserInfo: function(e) {
    var userInfo = e.detail.userInfo
    if (userInfo) {
      //用户按了授权按钮
      app.globalData.userInfo = userInfo
      app.globalData.userInfo['gender'] = (app.globalData.userInfo['gender'] == 1 ? "男" : "女")
      app.getOpenID()
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '必须授权才能使用考研小神器哦～',
        showCancel: false,
      })
    }
  },

  /* page.onload 获取用户授权 */
  authorize: function() {
    var that = this

    /*初始化回调函数*/
    //已获取用户信息的回调函数
    app.userInfoReadyCallback = function() {
      that.getInfo()
    }
    //未授权的回调函数
    app.needAuthorizeCallback = function() {
      that.setData({
        needAuthorize: true, //显示 授权 页面
        loading: false, //不显示 加载中 页面
      })
    }

    if (app.globalData.userInfo['version_mismatch']) {
      //微信版本太低，在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        lang: "zh_CN",
        success: res => {
          app.globalData.userInfo = res.userInfo
          app.globalData.userInfo['gender'] = (app.globalData.userInfo['gender'] == 1 ? "男" : "女")
          app.getOpenID()
          wx.switchTab({
            url: '../index/index',
          })
        }
      })
    }
  },

  // 获取用户基本信息(例如目标大学，座右铭等)
  getInfo: function() {
    app.globalData.goal = '复旦大学' //目标
    app.globalData.motto = '考研路上，我们都不是孤独的' //座右铭
    //获取计划（应该由网络获取）
    app.globalData.plan = testData.index_plan
    //在获取完之后才进入主界面，否则弹出对话框，提示网络错误(例如"网络连接超时")
    wx.switchTab({
      url: '../index/index',
    })

    //模拟获取等待时间
    //setTimeout(function() {}, 500)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.authorize() //获取授权
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})