var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Info:[],//获取订单信息,店铺信息,商品信息等
    imgurl: imgurl,
    order_id:'',
    shop_id:'',
    user_id:'',
    cont:'',
    star:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var order_id = options.order_id;
    this.getInfo(order_id);
  },
  //获取订单信息,店铺信息,商品信息等
  getInfo: function (order_id){
    var that = this;
    common.httpG('fankui/getInfo', { order_id: order_id }, function (data) {
      that.setData({
        Info: data.data,
        shop_id:data.data[0].shop_id,
        user_id:data.data[0].user_id,
        order_id: data.data[0].order_id,
      })
    })
  },

  //评论提交表单
  fankui:function(e){
    var that = this
    var username = common.getUserName();
    console.log(e.detail.value)
    common.httpP('fankui/save', {
      order_id:that.data.order_id,
      shop_id: that.data.shop_id,
      user_id: that.data.user_id,
      cont: e.detail.value.cont,
      star: e.detail.value.star,
    }, function (data) {
      if (data.code == 0) {
        wx.navigateTo({
          url:'/pages/assess/assess?username='+username
        })
      }
    })
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