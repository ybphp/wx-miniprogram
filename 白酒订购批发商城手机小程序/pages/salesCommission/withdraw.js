// pages/salesCommission/withdraw.js
Page({
  data:{
    amount:null,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      amount:350
    })
  },
  openWin(){
     wx.navigateTo({
       url: 'withdrawResult'
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