// pages/buyCard/buyCard.js
var apiRequest = require("../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolList:[],
    school:[],    
    index:2,
    studentName:'',
    schoolId:0,
    price:0,
    cardId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
      this.getSchool();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
//   获取学校列表
  getSchool: function(){
      var that = this;      
    var params = {};
    var schoolArr = [];
      apiRequest.request('schoolapi/buy_card_info', params, true, function (res) {
          if (res.code == 1) {
              for(var i in res.data){
                  schoolArr.push(res.data[i]['school']);
              }
              var index = that.data.index;
              that.setData({
                  schoolList:res.data,
                  school: schoolArr,
                  schoolId: res.data[index]['id'],
                  price: res.data[index]['price'],
                  cardId: res.data[index]['card_id']
              });
          } else {
              apiRequest.alert(res.msg);
              return false;
          }
      });
  },
//   获取学生姓名
setName: function(e){
    this.setData({
        studentName:e.detail.value
    });
},
//   获取学校id
  schoolChange: function (e){
    var index = e.detail.value;
    this.setData({
        index:index,
        schoolId:this.data.schoolList[index]['id'],
        price: this.data.schoolList[index]['price'],
        cardId:this.data.schoolList[index]['card_id']
    });
  },
//   立即购买
  buyCard: function(){
      var baby_name = this.data.studentName;
      var school_id = this.data.schoolId;
      var card_id = this.data.cardId;
      if(baby_name == ''){
          apiRequest.loadFail("请输入会员名称");
          return false;
      }
      var params = {
          baby_name: baby_name,
          school_id: school_id,
          card_id: card_id
      };
      apiRequest.request('schoolapi/buy_card', params, true, function (res) {
          if (res.code == 1) {
              var paysign = JSON.parse(res.data);
              paysign['success'] = function (res) {
                  wx.showModal({
                      content: "支付完成",
                      showCancel: false,
                      success: function () {
                          wx.switchTab({
                              url: '../index/index'
                          })
                      }
                  });
              }
              paysign['fail'] = function (res) {
                  apiRequest.alert("支付已取消！");
              }
              wx.requestPayment(paysign);
          } else if (res.code == 2){
              wx.showModal({
                  content: res.msg,
                  showCancel: false,
                  success:function(){
                      wx.switchTab({
                          url: '../index/index'
                      })
                  }
              });
          } else {
              apiRequest.loadFail(res.msg);
              return false;
          }
      });
      
  }
})