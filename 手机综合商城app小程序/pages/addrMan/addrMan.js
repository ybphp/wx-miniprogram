// pages/addrMan/addrMan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listItem:[
      { name: '姓名', phone: '18928928928', addr:'四川省 成都市 武侯区 什么街道什么号'},
      { name: '姓名', phone: '18928928928', addr: '四川省 成都市 武侯区 什么街道什么号' }
    ]
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
  addAddr() {
    wx.navigateTo({
      url: '../addAddr/addAddr'
    })
  },
  // 选择地址返回上一页
  backOrder(e){
    console.log(e);
    var pages = getCurrentPages(); // 获取页面栈
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      addr: e.currentTarget.dataset.item// 假数据
    })
    wx.navigateBack({
        delta: 1
    })

  }
})