var Utils = require("../../../utils/util.js");

// 默认的数据
var data = {
    focus:true,    // 是否自动聚焦
    value:""       // 输入的val
};

Page({

  /**
   * 页面的初始数据
   */
  data: data,

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
   myTrim:function(x){
        return x.replace(/^\s+|\s+$/gm, '');
  },
  changeFn: function (e) {  // 输入的时候获取里面的textarea and val
      var values = e.detail.value;
      this.setData({
          value: values
      })
  },
  SubmitFn:function(){  // 提交数据
      var _this  = this;
      var dataVal = this.data.value;
      var bValue = dataVal.replace(Utils.Verification.Ftrim,"");
      var KEY = wx.getStorageSync("login");
      
      if (bValue == "") return false;
     
      Utils.requestFn({
          url:'/index.php/feedback?server=1', 
          method:"POST",
          data: {
              sdk: KEY.sdk,
              uid: KEY.uid,
              title: dataVal,
              content: dataVal
          },
          success: function (res) {
              if (res.data.status){
                  Utils.reLaunch("发布反馈成功","/pages/myList/myList");
              }else{
                  Utils.reLaunch("发布反馈失败，请稍后再试", "/pages/myList/myList");
              }
          }
      })
  }
})