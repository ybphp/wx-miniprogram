// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

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
  bindOpenPot:function(){
    this.setData({
      isShow: true
    });
  },
  togglePopup() {
    this.setData({
      isShow: !this.data.isShow
    });
  }


})