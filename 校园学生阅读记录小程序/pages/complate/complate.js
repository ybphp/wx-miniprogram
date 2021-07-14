// pages/class/class.js
var apiRequest = require("../../utils/api.js");
var utils = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      piyue: [],
      tagIndex:0,
      modalStatus:false,
      school:"",
      date:"",
      completeData:[],
      bookId:0,
      is_buy_card:false,
      piyueIndex:0
  },
  onReady: function () {
    this.complete();
  },
  onShow: function (options) {
    this.setData({
      school:options.school,
      date:options.date,
      piyue:app.globalData.piyue,
      is_buy_card:app.globalData.is_buy_card
    });

  },
  // 完成列表数据
  complete: function(){
    var that = this;
    var params = {
      school:that.data.school,
      date:that.data.date
    };
    apiRequest.request("schoolapi/teacher_done",params,true,function(res){
      if(res.code == 1){
          for(var i in res.data){
              res.data[i]['piyue'] = "显示全文";
              res.data[i]['showBool'] = false;
              res.data[i]['create_time'] = utils.timeDesc(res.data[i]['create_time']);
          }
        that.setData({
          completeData:res.data
        });
        console.log(that.data.completeData)
      }else{
        apiRequest.alert(res.msg);
      }
    });
  },
//   显示全文
showAll: function(e){
    var completeInfo = this.data.completeData;
    for(var i in completeInfo){
        if(i == e.currentTarget.dataset.index){
            completeInfo[i].showBool = !completeInfo[i].showBool;
            if(completeInfo[i].showBool){
                completeInfo[i].piyue = "收起"                
            }else{
                completeInfo[i].piyue = "显示全文"            
            }
        }
    }
    this.setData({
        completeData:completeInfo
      });
},
//   设置批注标签
  setPiYue: function(e){
    this.setData({
        tagIndex:e.currentTarget.dataset.index
    });
    
  },
//   打开批阅窗口
  checkNote: function(e){
      this.setData({
        modalStatus:true,
        bookId:e.currentTarget.dataset.id,
        piyueIndex:e.currentTarget.dataset.index
      });
  },
  //   批阅完成
  piyueDone: function(){
    var that = this;
    this.setData({
        modalStatus:false
    });
    var tagIndex = that.data.tagIndex;
    var completaList = that.data.completeData;
    var piyueIndex = that.data.piyueIndex;
    var params = {
        id:that.data.bookId,
        review:that.data.piyue[tagIndex]
    }
    console.log(params)
    // 批阅接口
    apiRequest.request('schoolapi/teacher_review', params, true, function (res) {
        if (res.code == 1) {
            wx.showToast({
                title: res.msg
            })
            for(var i in completaList){
              if(piyueIndex == i){
                completaList[i]['review'] = that.data.piyue[tagIndex];
              }
              
            }
            that.setData({
              completeData:completaList
            });
        } else {
            apiRequest.alert(res.msg);
        }
    });
  },
//   关闭批阅窗口
  piyueClose: function(){
      this.setData({
        modalStatus: false
      });
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