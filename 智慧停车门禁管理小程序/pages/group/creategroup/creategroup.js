// pages/test/test.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    desc: '',
    token: wx.getStorageSync('token')
    // date: new Date().toLocaleString(),
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
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
    console.log(this.data.name)
  },
  descInput(e) {
    this.setData({
      desc: e.detail.value
    })
    console.log(this.data.desc)
  },
  createGroup() {
    console.log(this.data.date);
    var that = this;
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Team/addTeam',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        name: that.data.name,
        teamDes: that.data.desc,
        token: wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 2000
        }),
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
        }.bind(that), 2000)
      }
    })


  }
})