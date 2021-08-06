// pages/mine/mine.js
var app = getApp()
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     app.getUserInfo((userInfo)=>{
      //更新数据
      this.setData({
        userInfo:userInfo
      })
    })
  },
  openWin(){
    wx.navigateTo({
      url: 'information'
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})