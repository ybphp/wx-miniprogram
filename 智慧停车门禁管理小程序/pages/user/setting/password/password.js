// pages/user/setting/password/password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldpassword: '',
    newpassword: '',
    repassword: ''
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
  oldpassword(e) {
    this.setData({
      oldpassword: e.detail.value
    })
  },
  newpassword(e) {
    this.setData({
      newpassword: e.detail.value
    })
  },
  repassword(e) {
    this.setData({
      repassword: e.detail.value
    })
  },
  cancel() {
    wx.navigateBack({
      url: '../../setting/setting',
    })
  },

  confirm() {
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/',
      data: {

      },
      
    })
  }
})