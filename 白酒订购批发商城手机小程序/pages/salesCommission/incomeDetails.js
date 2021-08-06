// pages/salesCommission/incomeDetails.js

Page({
  data:{
     tabs: ["本周", "本月", "本年"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     wx.getSystemInfo({
            success: (res)=> {
                this.setData({
                    sliderWidth: res.windowWidth / this.data.tabs.length,
                    sliderOffset: res.windowWidth / this.data.tabs.length * this.data.activeIndex
                });
            }
        });
      this.setData({
        incomeList:[{
          order_id:1,
          order_no:'SA02201703052988',
          create_time:'2017.03.05 18:30',
          customer_name:'轩少',
          order_total:2399,
          order_Commission:450
        },{  order_id:2,
          order_no:'SA02201703052988',
          create_time:'2017.03.05 18:30',
          customer_name:'轩少',
          order_total:2399,
          order_Commission:450},{
              order_id:3,
          order_no:'SA02201703052988',
          create_time:'2017.03.05 18:30',
          customer_name:'轩少',
          order_total:2399,
          order_Commission:450
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
  },
  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
  }
})