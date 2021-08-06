//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    isshow:true,
    animationData: {},
    res:{
      "monthOrdersCount": 0,
      "monthOrdersTotalMoney": 0,
      "customerCount": 2
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo)=>{
      //更新数据
      this.setData({
        userInfo:userInfo
      })
    })
    app.tools.request('get','http://115.159.153.103:8800/disease_list?crop_id=1',(data)=>{
       console.log(data);
    }).then(app.tools.request('get','http://115.159.153.103:8800/disease_list?crop_id=1',(data)=>{
       console.log(data);
    }))
   
   
    
  },
  translate(){
    let windowWidth=null;
    wx.getSystemInfo({
      success: (res)=> {
        windowWidth=res.windowWidth
      }
    })
    //console.log(windowWidth)
    //移动动画
      var animation = wx.createAnimation({
        duration:600,
        timingFunction: "ease",
        delay: 0
      })
    animation.translate(-windowWidth).step()
    animation.height(0).step() 
        setTimeout(function(){
                this.setData({
                  animationData:animation.export()
                })
                 
     }.bind(this), 200)
  },
  bindMassge(e){
    //catchtap阻止事件冒泡     bindtap 不阻止事件冒泡
     console.log(e.target)
     console.log(e.currentTarget)
    wx.navigateTo({
      url: '../myOrder/orderMessage'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '我的分享',
      path: 'page/index/index'
    }
  },
  onPullDownRefresh:function(){
     //下拉刷新
     wx.stopPullDownRefresh()
  },
  onReachBottom:function(){
    console.log(12131)
     // 上拉触底时触发事件
    wx.showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
  }
    
})
