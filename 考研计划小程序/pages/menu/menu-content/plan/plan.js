var app = getApp()
var testData = require('../../../../utils/testData.js') //测试数据

Page({
  /**
   * 页面的初始数据
   */
  data: {
    color: ['#9DD3FA', '#1F6FB5', '#FCD692', '#FAFFEB', '#FFFFFF'], //左侧边条颜色，数目无限制
    totalPlan: [],
    hasMorePlan: true //true //
  },

  /* 加载更早的计划 */
  loadMore: function() {
    //如果还有计划就加载，没有就不加载
    if (this.data.hasMorePlan) {
      var that = this
      wx.showLoading({
        title: '玩命加载中',
      })
      //Todo 加载计划列表
      setTimeout(function() {
        var newPlans = testData.morePlan
        var setPlan = that.data.totalPlan
        for (var i in newPlans) {
          setPlan.push(newPlans[i])
        }
        //如果没有更多计划了，就设置flag
        if (true) {
          that.setData({
            hasMorePlan: false,
          })
        }
        that.setData({
          totalPlan: setPlan,
        })
        wx.hideLoading()
      }, 500)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      totalPlan: testData.plan
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

  },
})