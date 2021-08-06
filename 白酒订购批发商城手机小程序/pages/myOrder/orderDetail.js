// pages/myOrder/orderDetail.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      order:{
        order_no:'SA02201703052988',
        create_time:'2017.03.05 18:30',
        order_stauts:[{
           update_time:'2017.03.05 18：16',
           content:'厂家已确认，准备发货'
        },
        {
           update_time:'2017.03.05 18：16',
           content:'厂家已确认，准备发货'
        },
        {
           update_time:'2017.03.05 18：16',
           content:'厂家已确认，准备发货'
        }],
        order_foods:[{
            foods_img:'/assets/testimages/timg1.jpg',
            foods_name:'永泰老酒1915 六瓶/件',
            foods_price:'1950',
            foods_weight:'/件(6瓶)',
            foods_num:1,
        },{
            foods_img:'/assets/testimages/timg1.jpg',
            foods_name:'永泰老酒1988 六瓶/件',
            foods_price:'1950',
            foods_weight:'/件(6瓶)',
            foods_num:2,
        }],
        order_sum:4549,
        customer:{
          customer_name:'迪巴拉公司袁小娇',
          customer_address:'湖北省武汉市硚口区人民路302号迪巴拉公司研发部',
          receiver:'李璇',
          phone:'13297090125'
          
        },
        remarks:'喝假酒喝怕了，请快点...'
      }
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