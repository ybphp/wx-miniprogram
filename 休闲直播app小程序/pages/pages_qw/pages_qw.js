// pages/pages_sy/pages_sy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      opacity:1,
      display:"none"
  },
  tablanding: function () {
     this.setData({
       opacity:0,
       display:"flex"
     })
   },

  // const btn = document.querySelector('.btn');
  // const mask = document.querySelector('.weui-mask');
  // const iosActionsheet = document.getElementById('iosActionsheet');
  // const cancel = document.getElementById('iosActionsheetCancel');
  // cancel.addEventListener('click',function (){
  //   mask.style.display = 'none';
  //   iosActionsheet.classList.remove('weui-actionsheet_toggle');
  // },false);
  // btn.addEventListener('click',function (){
  //   mask.style.display = 'block';
  //   iosActionsheet.classList.add('weui-actionsheet_toggle');
  // },false);

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

  }
})
