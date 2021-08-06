// pages/wineProcess/orderWineDetail.js
Page({
  data:{
    background: ['http://img1.imgtn.bdimg.com/it/u=66250564,3253305393&fm=21&gp=0.jpg', 'http://pic.58pic.com/58pic/14/27/45/71r58PICmDM_1024.jpg', 'http://img1.imgtn.bdimg.com/it/u=66250564,3253305393&fm=21&gp=0.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     this.setData({
         goodsList:{
          id:1,
          name:'永泰老酒1915 六瓶/件',
          int:'产品或者一句话描述',
          img:'/assets/testimages/timg1.jpg',
          purity:'53%vol',
          weight:'500ml/瓶',
          norm:'6瓶/ 件',
          price:2699,
          fragrance:'酱香型',
          address:'仁怀市茅台镇',
          amount:20
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
  },
  addCart(){
    wx.navigateTo({
      url: 'shopCart'
    })
  },
  goShopCart(){
    wx.navigateTo({
      url: 'shopCart'
    })
  }
})