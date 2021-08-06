// pages/myOrder/orderMessage.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
       orderList:[{
        order_id:1,
        order_no:'SA02201703052988',
        money:1890,
        imgs:['/assets/testimages/timg1.jpg','/assets/testimages/timg1.jpg','/assets/testimages/timg1.jpg'],
        customer_name:'轩少',
        order_status:'已付款'
       },{
        order_id:2,
        order_no:'SA02201703052988',
        create_time:'2017.03.05 18:30',
        imgs:['/assets/testimages/timg1.jpg','/assets/testimages/timg1.jpg','/assets/testimages/timg1.jpg'],
        customer_name:'轩少',
        money:1890,
        order_status:'已付款'
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