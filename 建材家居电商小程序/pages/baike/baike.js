// pages/baike/baike.js
var common = require("../../utils/util.js");
const app = getApp();
const imgurl = app.globalData.imgUrl;
const wxurl = app.globalData.wxUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getArticle:{},
    art_id: '',
    imgurl:imgurl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var art_id = options.art_id
   
    this.setData({
      art_id: art_id
    })
    this.getArticle(art_id)
  },
  getArticle: function (art_id){
    var that = this;
    common.httpG('article/read', {
      art_id: art_id,
    }, function (data) {

      that.setData({
        articleList: data.data,
      })
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