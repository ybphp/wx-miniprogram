// pages/my/my.js
var apiRequest = require ("../../utils/api.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_buy_card:false,
    userInfo:{},
    school:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    //   未办卡填充个人微信信息
      if (app.globalData.userInfo.nickName){
          this.setData({
              userInfo: {
                  read_time: 0,
                  borrow_num: 0,
                  score: 0,
                  baby_name: app.globalData.userInfo.nickName,
                  baby_avatar: app.globalData.userInfo.avatarUrl
              }
          });
      }
    if (app.globalData.is_buy_card){
        this.setData({
            is_buy_card: app.globalData.is_buy_card,
            babyId: app.globalData.userData.baby_id,
            school: app.globalData.userData.school,
        });
        this.userData();
    }
  },
  userData: function(){
    var that = this;
    var params = {
      baby_id:this.data.babyId
    };
    apiRequest.request("schoolapi/user",params,true,function(res){
      if(res.code == 1){
        that.setData({
            userInfo: res.data
        });
      }
    });
  }
})