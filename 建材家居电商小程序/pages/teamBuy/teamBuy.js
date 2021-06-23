// pages/teamBuy/teamBuy.js
var common = require("../../utils/util.js");
var app = getApp();

const imgurl = app.globalData.imgUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: '',
    currentTab: 0,
    imgurl: imgurl,
    list:{},
    history:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    this.list();
    this.history();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      },
    })
  },
  list:function(){
    var that = this;
    common.httpG('group/goon_pnum', {}, function (data) {
      that.setData({ list: data.data })
    })
  },
  history:function(){
    var that = this;
    common.httpG('group/history_pnum', {}, function (data) {
      that.setData({ history: data.data })
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