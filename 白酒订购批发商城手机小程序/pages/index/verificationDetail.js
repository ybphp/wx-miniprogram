// pages/index/verificationDetail.js
Page({
  data:{
      info:{
        code:null,
        name:'永泰老酒1953',
        norm:'500ml/瓶',
        factory:'仁怀市茅台镇永泰酒业有限公司',
        batch:'2015-06 A108',
        system:'ISO-9002-2000'
      }
    },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      'info.code':options.code
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