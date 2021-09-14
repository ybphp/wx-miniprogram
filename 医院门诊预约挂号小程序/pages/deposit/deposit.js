// pages/deposit/deposit.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value2:"",
    show:"show",
    money:"",
    active:"",
    sickName: "",
    sickCard: "",
    button: [{ id: 100, type: "" }, { id: 200, type: "" }, { id: 500, type: "" }, { id: 1000, type: "" }]
  },

  sickDataFun:function(){
    if (app.globalData.sickName){
      this.setData({
        show:"show"
      })
    }else{
      this.setData({
        show: "hidden"
      })
    }
  },

  moneyChange: function ({ detail }){
    var money = detail.detail.value
    this.setData({
      money: money
    })
  },

  handleClick:function(e){
    var money = e.target.dataset.money;
    var arr = this.data.button;
    for (var i of arr){
      if(money == i.id){
        i.type ="primary"
      }else{
        i.type = ""
      }
    }
    this.setData({
      money: money,
      button: arr
    })
  },

  inputMoney: function (){
    var info = {
      money: this.data.money
    }
    wx.navigateTo({
      url: '/pages/inHSPay/inHSPay?info=' + JSON.stringify(info)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sickName: app.globalData.sickName,
      sickCard: app.globalData.sickCard
    })
    this.sickDataFun();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})