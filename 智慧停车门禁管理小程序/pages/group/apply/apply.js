// pages/group/apply/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  id: '',
  token: wx.getStorageSync('token'),
  name: '',
  des: '',
  status: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      name: options.name,
      des: options.des,
      status: options.status
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
  
  },

  apply() {
    var that = this;
    let token = wx.getStorageSync('token')
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Team/userApplyTeam',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        teamId: that.data.id,
        token: token
      },
      method: "GET",
      success(res){
        console.log(res)
        if(res.data[0].error == '0') {
          wx.showToast({
            title: '加入成功',
            duration: 1500,
            mask: true
          })
          setTimeout(function() {
            wx.navigateBack({
              url: '../group'
            })
          }.bind(that), 1500)
        }
      }
    })
  },

  focus() {
    var that = this;
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Team/followTeam',
      data: {
        userId: 'admin',
        passWord: '0192023a7bbd73250516f069df18b500',
        teamId: that.data.id,
        token: that.data.token
      },
      method: "GET",
      success(res){
        console.log(res)
        if (res.data[0].error == '0') {
          wx.showToast({
            title: '关注成功',
            duration: 1500,
            mask: true
          })
          setTimeout(function () {
            wx.navigateBack({
              url: '../group'
            })
          }.bind(that), 1500)
        }
      }
    })
  }
})