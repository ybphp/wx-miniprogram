// pages/complate/complate.js
var apiRequest = require("../../utils/api.js");
var utils = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBool: false,
    is_buy_card: false,
    school: "",
    completeData: [],
    noMore: false,
    loadStatus: true,
    scrollHeight:0,
    noData:false,
    page:0,
    tipInfo: {
        title: "请先购买会员卡"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that = this;
    if (app.globalData.is_buy_card){
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: res.windowHeight
                });
            }
        })
        that.setData({
            is_buy_card: app.globalData.is_buy_card,
            school: app.globalData.userData.school
        });
        this.complete();        
    }
    
    
  },
  // 完成列表数据
  complete: function () {
    var that = this;
    var loadStatus = that.data.loadStatus;
    if (loadStatus) {
      that.setData({
        page: that.data.page + 1
      });
      var page = that.data.page;
      var params = {
        school: that.data.school,
        page: page,
        limit: 2
      };
      apiRequest.request("schoolapi/timeline", params, true, function (res) {
        if (res.code == 1) {
          if (res.data.length <= 0) {
            that.setData({
              noMore: true
            });
          }else{
            for (var i in res.data) {
              res.data[i]['piyue'] = "显示全文";
              res.data[i]['showBool'] = false;
              res.data[i]['create_time'] = utils.timeDesc(res.data[i]['create_time']);
            }
            that.setData({
              loadStatus: true,
              completeData: that.data.completeData.concat(res.data)
            });
          }
          if(that.data.completeData.length <= 0){
            that.setData({
              noData:true
            });
          }
        } else {
          apiRequest.alert(res.msg);
        }
      });
    }
    that.setData({
      loadStatus: false
    })
  },
  //   显示全文
  showAll: function (e) {
    var completeInfo = this.data.completeData;
    for (var i in completeInfo) {
      if (i == e.currentTarget.dataset.index) {
        completeInfo[i].showBool = !completeInfo[i].showBool;
        if (completeInfo[i].showBool) {
          completeInfo[i].piyue = "收起"
        } else {
          completeInfo[i].piyue = "显示全文"
        }
      }
    }
    this.setData({
      completeData: completeInfo
    });
  },
  //   加载更多
  loadMore: function () {
    var noMore = this.data.noMore;
    console.log(noMore)
    
    if (!noMore) {
      this.complete();
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})