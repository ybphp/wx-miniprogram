// pages/index/verification.js
Page({
  data:{
    verification:false,
    code1:null,
    code2:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  bindCodeInput1(e){
    //console.log(e.detail.value)
     this.setData({
      code1:e.detail.value
    })
  },
   bindCodeInput2(e){
     this.setData({
      code2:e.detail.value
    })
  },
  onUnload:function(){
    // 页面关闭
  }
})