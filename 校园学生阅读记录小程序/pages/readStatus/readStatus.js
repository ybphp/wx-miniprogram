// pages/complate/complate.js
var apiRequest = require ("../../utils/api.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      loadStatus:true,
      school:"",
      classList:[],
      is_buy_card:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
      var that = this;
      that.setData({
          school: app.globalData.userData.school,
          is_buy_card: app.globalData.is_buy_card
      });
    that.classCheck();
  },
    classCheck: function(){
        var that = this;
        var params = {
            school:this.data.school
        };
        apiRequest.request("schoolapi/teacher_count",params,true,function(res){
            if(res.code == 1){
                that.setData({
                    classList:res.data
                });
            }
        });
    },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})