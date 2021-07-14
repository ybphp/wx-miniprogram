// pages/notComplate/notComplate.js
var apiRequest = require("../../utils/api.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:"",
    date:"",
    notCompleteData:[],
    is_buy_card:false    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.setData({
      school:options.school,
      date:options.date,
      is_buy_card:app.globalData.is_buy_card
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.notComplete();
  },
  // 未完成列表数据
  notComplete: function(){
    var that = this;
    var params = {
      school:that.data.school,
      date:that.data.date
    };
    apiRequest.request("schoolapi/teacher_other",params,true,function(res){
      if(res.code == 1){
        that.setData({
          notCompleteData:res.data
        });
      }else{
        apiRequest.alert(res.msg);
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})