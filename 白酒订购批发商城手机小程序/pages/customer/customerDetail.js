// pages/customer/customerDetail.js
Page({
  data:{
     customerInfo:{
       
     },
     sexs: ["男", "女"],
     sexIndex: null,
     ages:["20岁以下","20~30岁",'30~40岁','50~60岁','60岁以上'],
     ageIndex:null
  },
  bindSexChange(e) {
          console.log('picker account 发生选择改变，携带值为', e.detail.value);
          this.setData({
              'sexIndex': e.detail.value,
              'customerInfo.sex':this.data.sexs[e.detail.value]
          })
      },
  bindAgeChange (e) {
      this.setData({
          'ageIndex': e.detail.value,
          'customerInfo.age':this.data.ages[e.detail.value]
      });
  },
  bindKeyInput(e){
     this.setData({
      'customerInfo.customerName':e.detail.value
     })
  },
  onLoad: function (options) {
      let type = options.type=='add' ?  'add' : 'edit';
      let title =  options.type=='add' ? '新建客户' : '编辑客户';
      wx.setNavigationBarTitle({
        title:title, 
      })
      let customerInfo={};
      if(type=="add"){
        customerInfo={}
      }else{
        customerInfo={
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
      }
      this.setData({
        customerInfo:customerInfo
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