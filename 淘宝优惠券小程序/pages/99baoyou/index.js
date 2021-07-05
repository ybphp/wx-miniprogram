// pages/99baoyou/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["选项", "选项", "选项", "选项", "选项", "选项", "选项", "选项", "选项", "选项"],
    activeIndex: 0,
    sliderOffset: 0,
    movableAreaWidth: 0,
    movableAreaLeft: 0,
    movableViewX: 0,
    tabWidth: 100,

    sort: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderOffset: that.data.tabWidth * that.data.activeIndex,
          movableAreaWidth: that.data.tabWidth * that.data.tabs.length * 2 - res.windowWidth * res.pixelRatio,
          movableAreaLeft: res.windowWidth * res.pixelRatio - that.data.tabWidth * that.data.tabs.length,
          movableViewX: that.data.tabWidth * that.data.tabs.length - res.windowWidth,
        });
      }
    });
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  sortClick: function (e) {
    this.setData({
      sort: e.currentTarget.dataset.id
    });
  },
})