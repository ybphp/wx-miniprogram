// pages/salesCommission/withdrawHistory.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      withdrawList:[{
        update_time:'2017.03.06',
        update_status:'正在打款',
        withdrawal_amount:200.00
      },{
        update_time:'2017.03.06',
        update_status:'已付款',
        withdrawal_amount:200.00
      },{
        update_time:'2017.03.06',
        update_status:'已付款',
        withdrawal_amount:200.00
      }]
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