// pages/tableDetail/tableDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headNavFlag: 1,
    alreadyProductFlag: 1,
    memberCouponFlag:1,
    sortFlag:true,
    memberLoginFlag:true,//会员零时登陆演示
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
  toggleHeadNav: function (e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      headNavFlag: index
    });
  },
  toggleAlreadyProduct:function(e){
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      alreadyProductFlag: index
    });
  },
  toggleMemberCoupon:function(e){
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      memberCouponFlag: index
    });
  },
  toggleSort:function(e){
    this.setData({
      sortFlag: !this.data.sortFlag
    });
  },
  toAddProduct:function(e){
    wx.navigateTo({
      url: '/pages/product/product',
    })
  },
  toCheckout:function(){
    wx.navigateTo({
      url: '/pages/checkout/checkout',
    })
  },
  loginMember:function(){
    this.setData({
      memberLoginFlag:false
    })
  }
})