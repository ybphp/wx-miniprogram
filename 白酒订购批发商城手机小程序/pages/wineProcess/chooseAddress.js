// pages/wineProcess/chooseAddress.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    this.setData({
    // 页面渲染完成
      customerInfo:{
         customerName:'测试',
          sex:'男',
          age:'20~30岁',
          address:[{
            addressId:1,
            addressName:'公司',
            address:'湖北省武汉市硚口区人名西路302号明日财富大厦20层，迪吧拉亚公司研发部',
            consignee:'轩少',
            phone:13985858585
          },{
            addressId:2,
            addressName:'家',
            address:'湖北省武汉市硚口区人名西路302号明日财富大厦20层，迪吧拉亚公司研发部',
            consignee:'袁小娇',
            phone:13985858585
          }
          ]
        }
    })
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