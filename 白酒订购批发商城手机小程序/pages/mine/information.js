// pages/mine/information.js
const app=getApp();
Page({
  data:{
     sexs: ["男", "女"],
     sexIndex: null,
     ages:["20岁以下","20~30岁",'30~40岁','50~60岁','60岁以上'],
     ageIndex:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  app.getUserInfo((userInfo)=>{
      //更新数据
      this.setData({
        userInfo:userInfo,
        user:{
          name:'测试',
          phone:'13297090782',
          sex:'男',
          age:'20~30岁',
        }
      })
    })
     
    
  },
   bindSexChange(e) {
          console.log('picker account 发生选择改变，携带值为', e.detail.value);
          this.setData({
              "sexIndex": e.detail.value,
              "user.sex":this.data.sexs[e.detail.value]
          })
      },
  bindAgeChange (e) {
      this.setData({
          "ageIndex": e.detail.value,
           "user.age":this.data.ages[e.detail.value]
      });
  },
  backWind(){
     //关闭并返回 
     wx.navigateBack({
       delta: 1, // 回退前 delta(默认为1) 页面
       success: function(res){
         // success
       },
       fail: function() {
         // fail
       },
       complete: function() {
         // complete
       }
     })
  },
  changeData(data){
     let changetype=data.name || data.phone;
     if(data.name){
       this.setData({
         "user.name": changetype
       })
     }else{
        this.setData({
         "user.phone": changetype
       })

     }
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