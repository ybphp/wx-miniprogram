// pages/checkout/checkout.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberSignQr: false,
    memberCouponFlag:1,
    memberCardInfoFlag:true,
    couponModalFlag:false
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
  toggleMemberSignQr: function () {
    this.setData({
      memberSignQr: true
    });
  },
  closeMemberSignQr: function () {
    this.setData({
      memberSignQr: false
    });
  },
  toggleMemberCoupon: function (e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      memberCouponFlag: index
    });
  },
  closeMemberCardInfo: function () {
    this.setData({
      memberCardInfoFlag: false
    });
  },
  toggleCouponModal: function () {
    this.setData({
      couponModalFlag: !this.data.couponModalFlag
    });
  },
  toReceivablesView:function(){
    wx.navigateTo({
      url: '/pages/receivables/receivables',
    })
  }
})