// pages/orderWine/orderWine.js
Page({
  data:{
    showModalStatus:false,             //是否显示mask   和选择菜单
    chooseFactory:{},                   //选中的厂家
    factoryList:{},                     //厂家列表
    goodsList:{},                       //商品列表
    tabs: ['商品列表', '订制酒专区','企业介绍'],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0 ,
    windowHeight:null,
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      goodsList:{
        "hasnext": 0,
        "list": [ {
          "id": 606,
          "factory_id": 1,
          "title": "复合肥（12-18-15-S）",
          "weight": "600ml",
          "weight_unit": "瓶",
          "pack_spec": "3瓶",
          "pack_spec_unit": "件",
          "price": 60,
          "image": {
            "product_id": 606,
            "imgurl": "http://wine.bodata.cn/product/1.jpg"
          }
        },
        {
          "id": 605,
          "factory_id": 1,
          "title": "磷酸二铵（玛拉松16-44-0）",
          "weight": "500ml",
          "weight_unit": "瓶",
          "pack_spec": "5瓶",
          "pack_spec_unit": "件",
          "price": 50,
          "image": null
          }]
       },
      

    })
    wx.getSystemInfo({
      success: (res)=> {
        console.log(res.windowHeight)
        this.setData({
           windowHeight:res.windowHeight
         })
      }
    })
    //console.log(this.data.factoryList[0])
    let chooseFactory=wx.getStorageSync('chooseFactory') || this.data.factoryList[0];
    this.setData({
      chooseFactory:chooseFactory
    })
  },
  tabClick(e) {
    //tab切换
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
 },
  showModal(){
     //显示遮罩层 选择界面
      var animation = wx.createAnimation({
              duration: 300,
              timingFunction: "ease",
              delay: 0
      })
      this.animation = animation
      animation.translateY(-300).step()
      this.setData({
              animationData: animation.export(),
              showModalStatus: true
      })
      setTimeout(function () {
              animation.translateY(0).step()
              this.setData({
                      animationData: animation.export()
              })
      }.bind(this), 300)
      
  },
  hideModal(){
    //隐藏遮罩层
     var animation = wx.createAnimation({
              duration: 300,
              timingFunction: "ease",
              delay: 0
      })
      this.animation = animation
      animation.translateY(-300).step()
      this.setData({
          animationData: animation.export(),
      })
      setTimeout(function () {
              animation.translateY(0).step()
              this.setData({
                      animationData: animation.export(),
                      showModalStatus: false
              })
      }.bind(this), 300)
  },
  chooseFactory(e){
    //console.log(e.currentTarget.dataset.id)
    let index= this.data.factoryList.findIndex((value, index, arr)=>{
       return value.id==e.currentTarget.dataset.id
    })
    this.setData({
        chooseFactory:this.data.factoryList[index]
    })
   
    setTimeout(()=>{this.hideModal()},200)

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
  onReachBottom:function(){
    // 上拉触底时触发事件
    wx.showLoading({
      title: '加载中',
    }) 
    setTimeout(function(){
      wx.hideLoading()
    },2000)
  }
 

})