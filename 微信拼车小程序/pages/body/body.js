// pages/user/user.js
var app = getApp();
var options1;

Page({
  data: {
    items:[
      {name:"张三",qidian:"上海浦东",cfdate:"2017-5-9",zhongdian:"深圳福田",usertype:"乘客"},
       {name:"李四",qidian:"上海浦东",cfdate:"2017-5-9",zhongdian:"深圳福田",usertype:"乘客"},
        {name:"王老五",qidian:"上海浦东",cfdate:"2017-5-9",zhongdian:"深圳福田",usertype:"乘客"},
         {name:"张三",qidian:"上海浦东",cfdate:"2017-5-9",zhongdian:"深圳福田",usertype:"乘客"},
          {name:"张三",qidian:"上海浦东",cfdate:"2017-5-9",zhongdian:"深圳福田",usertype:"乘客"},
           {name:"张三",qidian:"上海浦东",cfdate:"2017-5-9",zhongdian:"深圳福田",usertype:"乘客"},
    ]
  },
  onLoad: function (options) {
    var that = this;
    options1 = options;
    // this.lodingto()
    // this.indexRequest(options)
    //调用应用实例的方法获取全局数据

    app.getUserInfo(function (userInfo) {

    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    //这里写用户下拉的时候你执行的动作，如：发起wx.request请求一次，或者其他请求
    this.indexRequest();
  },
  // 进入详情页
  tocaruser: function (e) {

    var id = e.target.id
    wx.navigateTo({
      url: '../caruser/caruser?id=' + id + ''
    })
  },
  
  lodingto: function () {
    wx.showLoading({
      title: '正在加载',
      icon: 'loading',

    })
  },
  closeloding: function () {
    wx.hideLoading()
  }
})