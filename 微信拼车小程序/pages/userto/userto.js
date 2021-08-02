// pages/userto/userto.js
var app = getApp();
var nickName;
var id
Page({
  data: {

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数;
    // console.log(options);
    var that = this;
    id = options.id

    app.getUserInfo(function (userInfo) {
      nickName = userInfo.nickName;
      // console.log(nickName)
    })
    this.torequire()
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
  // 请求服务器
  torequire: function () {
    // console.log(id)
    var that = this
   
  },
  // 关闭发布信息
  closepinche: function (e) {
    console.log(e.currentTarget.id);
    var that=this
   

  }
})