// pages/home/home.js
const urlApi = require('../../utils/server.api.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pensorShowTop:"show",
    pensorShowBottom: "hidden",
    pensorName:"",
    pensorNumber:"",
    visible1: false,
    code:"",
    actions4: [
      {
        name: '确定'
      },
    ]
  },
  getPonsorInfo:function(){
    var that = this;
    wx.request({
      url: urlApi.getScikList2(),
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
         WID:app.globalData.openid
      },
      success: function (data) {
        if (data.data.LIST.length > 0){
          var obj = data.data.LIST;
          if (obj.length == 0)return;
          that.setData({
            pensorShowTop: "hidden",
            pensorShowBottom: "show",
            pensorName: obj[0].NAME,
            pensorNumber: obj[0].PATIENT_ID
          })
          var person = obj;
          person = person.reduce((cur, next) => {
            obj[next.IDCARD] ? "" : obj[next.IDCARD] = true && cur.push(next);
            return cur;
          }, []);
          var sfzArr = new Array();
          person.map(i=>{
            sfzArr.push(i.IDCARD)
          })
          app.globalData.SFZlist = sfzArr
          app.globalData.sickName = that.data.pensorName;
          app.globalData.BRID = obj[0].BR_ID;
          app.globalData.SFZH = obj[0].IDCARD;
          app.globalData.sickCard = that.data.pensorNumber; 
          app.globalData.sickList = person;
        }
      }
    })
  },
  /**
   * 添加就诊人
   */
  addVisitCard: function () {
    app.addVisitCard();
  },
  /**
   * 就诊人列表
   */
  personList: function () {
    wx.navigateTo({
      url: '../myperson/myperson'
    })
  },

  goInfo:function(){
    wx.switchTab({
      url: '/pages/info/info',
    })
  },
  /**
   * 住院人列表
   */
  residentList: function () {
    wx.navigateTo({
      url: '../myresident/myresident'
    })
  },
  /**
   * 住院充值
   */
  gotoDeposit: function () {
    wx.navigateTo({
      url: '../deposit/deposit'
    })
  },

  //记录查询
  registerLog:function(e){
     wx.navigateTo({
       url: '/pages/registerLog/registerLog?type=' + e.currentTarget.dataset.type
    })
  },

  //去住院日清单页面
  goDayLog: function (e) {
    wx.navigateTo({
      url: '/pages/dayLog/dayLog'
    })
  },

  //住院报告
  report:function(){
    wx.navigateTo({
      url: '/pages/report/report'
    })
  },

  //获取二维码
  EWM:function () {
    this.setData({
            visible1: true
        });
  },

  //取消
  handleClose1() {
    this.setData({
      visible1: false
    });
  },

  //和changeMan,的通信函数
  onGetCode: function (e) {
    this.setData({
      code: e.detail.val
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.globalData.sickList = [];
    app.globalData.changeMan = {
      changeMan:function(data){
        console.log("切换人",data)
        that.setData({
          pensorName: data.NAME,
          pensorNumber: data.PATIENT_ID
        })
        app.globalData.sickName = data.NAME;
        app.globalData.BRID= data.BR_ID;
        app.globalData.SFZH = data.IDCARD;
        app.globalData.sickCard = data.PATIENT_ID;
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getPonsorInfo();
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