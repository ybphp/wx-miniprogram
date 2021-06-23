Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    head_img: '',
    token: wx.getStorageSync('token'),
    status: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      //如果全局用户信息存在，则直接设置数据
      withCredentials: false,
      success: function (res) {
        that.setData({
          nickname: res.userInfo.nickName,
          head_img: res.userInfo.avatarUrl
        })
      }
    })
    wx.request({
      url: 'https://www.zjzlnet.com/zjepeframeworks/zjepeframe_Common/getUserByToken?userId=admin&passWord=0192023a7bbd73250516f069df18b500',
      data: {
        token: that.data.token
      },
      method: 'GET',
      success(res) {
        console.log(res.data.data)
        // 1代表未审核，0代表已审核
        that.setData({
          status: res.data.data
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

  },

  toFeedback() {
    wx.navigateTo({
      url: './feedback/feedback',
    })
  },

  toEntrance() {
    if (this.data.status == 1 || this.data.status == 2) {
      wx.showToast({
        title: '未审核',
        icon: 'loading',
        duration: 2000,
        mask: true,
      })
    } else {
      wx.navigateTo({
        url: '../entrance/entrance',
      })
    }
  },

  toGroup() {
    if (this.data.status == 1 || this.data.status == 2) {
      wx.showToast({
        title: '未审核',
        icon: 'loading',
        duration: 2000,
        mask: true,
      })
    } else {
      wx.navigateTo({
        url: '../group/group',
      })
    }
  },

  toVisitor() {
    if (this.data.status == 1 || this.data.status == 2) {
      wx.showToast({
        title: '未审核',
        icon: 'loading',
        duration: 2000,
        mask: true,
      })
    } else {
      wx.navigateTo({
        url: '../guest/guesthistory/guesthistory',
      })
    }

  },
  toPark() {
    wx.navigateTo({
      url: '../park/park',
    })
  },
  setting() {
    wx.navigateTo({
      url: './setting/setting',
    })
  }
})