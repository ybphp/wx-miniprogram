// pages/signedFactory/factoryList.js
Page({
  data:{
      tabs: ["全部厂家", "已签约厂家"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
       wx.getSystemInfo({
            success: (res)=>{
                this.setData({
                   sliderWidth: res.windowWidth / this.data.tabs.length,
                    sliderOffset: res.windowWidth / this.data.tabs.length * this.data.activeIndex
                });
            }
        });
        this.setData({
          factoryList:[
            {
              factory_name:'仁怀市茅台镇永泰酒业有限公司',
              factory_img:'/assets/testimages/timg1.jpg',
              factory_Int:'贵州省仁怀市茅台镇永泰酒业股份有限公司位于美丽的赤水河畔，与驰名中外的茅台集团共享得天独厚的土壤、气候、水质和微生物群等优越的自然条件。厂区占地面积60余亩，厂房面积5000多平方米，拥有多口酿造使用多年的老窖池，目前年生产能力约为1千多吨原酒。在茅台镇众多的酒厂中，永泰酒业公司是为数不多的资深厂家之一。',
              foods_img:[
                 '/assets/testimages/timg1.jpg'
              ,'/assets/testimages/timg1.jpg','/assets/testimages/timg1.jpg','/assets/testimages/timg1.jpg','/assets/testimages/timg1.jpg'
              ]
            },
             {
              factory_name:'仁怀市茅台镇永泰酒业有限公司',
              factory_img:'/assets/testimages/timg1.jpg',
              factory_Int:'贵州省仁怀市茅台镇永泰酒业股份有限公司位于美丽的赤水河畔，与驰名中外的茅台集团共享得天独厚的土壤、气候、水质和微生物群等优越的自然条件。厂区占地面积60余亩，厂房面积5000多平方米，拥有多口酿造使用多年的老窖池，目前年生产能力约为1千多吨原酒。在茅台镇众多的酒厂中，永泰酒业公司是为数不多的资深厂家之一。',
              foods_img:[
                 '/assets/testimages/timg1.jpg'
              ,'/assets/testimages/timg1.jpg','/assets/testimages/timg1.jpg','/assets/testimages/timg1.jpg','/assets/testimages/timg1.jpg'
              ]
            }
          ]
        })
  },
  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
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