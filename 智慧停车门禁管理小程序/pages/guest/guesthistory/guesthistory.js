Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    windowHeight: wx.getSystemInfoSync().windowHeight,
    token: wx.getStorageSync('token')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_msgUser/getVisitedStoryMsg',
      method: 'GET',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        token: that.data.token
      },
      success(res) {
        console.log(res.data.data[0]);
        let list = [];
        for (let i = 0; i < res.data.data.length; i++) {
          list.push(res.data.data[i]);
        }
        that.setData({
          list: list
        })
      }
    })
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