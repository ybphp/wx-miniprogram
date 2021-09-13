// 函数库
var Utils = require("../../utils/util.js");

// pages/setUp/setUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  getStorag:function(){ // 获取本地存储信息
          var data = wx.getStorageSync("login");
          return {
                  sdk: data.sdk,        
                  uid: data.uid
          }
  },
  quitFn:function(){    // 退出登陆
      Utils.removeStorage("Reset"); 
          var res =  this.getStorag();
          Utils.requestFn({
                  url: '/index.php/loginOut?server=1', 
                  method:"POST",
                  data: {
                          sdk: res.sdk,
                          uid: res.uid
                  },
                  success: function (res) {
                          if (res.data.status){
                                  wx.reLaunch({
                                      url: '/pages/login/login'
                                  })
                                  Utils.removeStorage("login");
                                  
                          }else{
                              Utils.reLaunch(res.data.message,"/pages/login/login");
                              Utils.removeStorage("login");
                          }
                          return false;
                  }
          })
  }
})