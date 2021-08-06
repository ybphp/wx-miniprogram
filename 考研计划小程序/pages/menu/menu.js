var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /*点击 考研计划 按钮 */
  clickPlan: function() {
    wx.navigateTo({
      url: '../menu/menu-content/plan/plan',
    })
  },

  /*点击 考研日记 按钮 */
  clickDiary: function() {
    wx.navigateTo({
      url: '../menu/menu-content/diary/diary',
    })
  },

  /*点击 考研安排 按钮 */
  clickExam: function() {
    wx.navigateTo({
      url: '../menu/menu-content/exam/exam',
    })
  },

  /*点击 设置 按钮 */
  clickSetting: function() {
    wx.navigateTo({
      url: '../menu/menu-content/setting/setting',
    })
  },

  /*点击 错误反馈 按钮 */
  clickFeedback: function() {
    wx.navigateTo({
      url: '../menu/menu-other/feedback/feedback',
    })
  },

  /*点击 联系我们 按钮 */
  clickContact: function() {
    wx.navigateTo({
      url: '../menu/menu-other/contact/contact',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      motto: app.globalData.motto,
      nickName: app.globalData.userInfo['nickName'],
      avatarUrl: app.globalData.userInfo['avatarUrl']
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})