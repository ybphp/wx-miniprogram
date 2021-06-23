//index.js
//获取应用实例
var app = getApp()


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    img:"http://img.tom61.com/flashdown/ktsz/35306.gif",
    categories:[
      {type:'数字',typePinYin:'shuzi'},
      {type:'水果',typePinYin:'shuiguo'},
      {type:'动物',typePinYin:'dongwu'},
      {type:'身体部位',typePinYin:'shentibuwei'},
    ]
  },
  //事件处理函数
  handleToCategory:function(event){
    wx.navigateTo({
      url:"/pages/category/category?type=" + (event.currentTarget.dataset.type || 'shuiguo')
    })
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
