// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  handleGetUserInfo(res) {
    if (res.detail.userInfo) {
      console.log(res.detail.userInfo)
      app.globalData.userInfo = res.detail.userInfo
      if (this.data.from) {
        this.data.tab ? wx.switchTab({ url: this.data.from }) : wx.redirectTo({ url: this.data.from })
      } else {
        wx.switchTab({ url: `/pages/index/index` })
      }
    } else {
      console.log('拒绝授权')
      wx.showToast({
        title: '当前已拒绝授权，将在2秒内跳转首页',
        icon: 'none',
        duration: 2000,
        complete: () => {
          wx.switchTab({ url: '/pages/index/index' });
        }
      })
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.options && this.options.from) {
      this.setData({ "from": `/${this.options.from}`, "tab": this.options.tab })
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