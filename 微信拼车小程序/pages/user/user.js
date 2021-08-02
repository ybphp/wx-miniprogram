// pages/user/user.js
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    this.netstart()
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
    netstart: function () {
    var that = this
    console.log("正在查询网络状态")
    wx.getNetworkType({
      success: function (res) {
console.log(res.networkType)
        if (res.networkType == "none") {
          that.setData({
            networkType: false
          })
        }else{
           that.setData({
            networkType: true
          })
        }
      }
    })
  },
  userbody:function () {
    wx.navigateTo({
      url: '../userbody/userbody?id=1'
    })
  },
  Feedback:function(){
    wx.navigateTo({
      url: '../Feedback/Feedback?id=1'
    })
  }
})